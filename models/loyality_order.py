from odoo import models, fields, api
from odoo.exceptions import UserError


class LoyaltyOrder(models.Model):
    _name = 'loyalty.order'
    _description = 'Loyalty Order'

    partner_id = fields.Many2one('res.partner', string='Client', required=True)
    category_id = fields.Many2one('product.category', string='Catégorie', required=True)
    product_id = fields.Many2one('product.product', string='Produit', required=True,
                                 domain="[('categ_id', '=', category_id)]")
    points_used = fields.Integer(string='Points Utilisés', compute='_compute_points_used')
    partner_loyalty_points = fields.Integer(string='Points de Fidélité du Client',
                                            compute='_compute_partner_loyalty_points')

    @api.depends('category_id')
    def _compute_points_used(self):
        for order in self:
            order.points_used = order.category_id.redeem_points

    @api.depends('partner_id')
    def _compute_partner_loyalty_points(self):
        for order in self:
            order.partner_loyalty_points = order.partner_id.loyalty_points

    def action_create_order(self):
        # Vérifier si le client a suffisamment de points
        if self.partner_loyalty_points < self.points_used:
            raise UserError(
                f"Points insuffisants ! Le client a {self.partner_loyalty_points} points "
                f"mais {self.points_used} points sont nécessaires pour cette commande."
            )

        # Trouver une session POS ouverte pour l'utilisateur actuel
        user_id = self.env.user.id
        session = self.env['pos.session'].search([
            ('state', '=', 'opened'),
            ('user_id', '=', user_id)
        ], limit=1)

        if not session:
            # Si aucune session ouverte n'est trouvée, lever une erreur
            raise UserError("Aucune session POS ouverte trouvée pour l'utilisateur actuel.")

        # Logique pour créer une commande à 0 €
        order = self.env['pos.order'].create({
            'partner_id': self.partner_id.id,
            'session_id': session.id,
            'lines': [(0, 0, {
                'product_id': self.product_id.id,
                'price_unit': 0,
                'qty': 1,
                'price_subtotal': 0,
                'price_subtotal_incl': 0,
                'name': self.product_id.name,
            })],
            'amount_tax': 0,
            'amount_total': 0,
            'amount_paid': 0,
            'amount_return': 0,
        })

        order.action_pos_order_paid()

        # Déduire les points du client
        self.partner_id.loyalty_points -= self.points_used

        # Retourner une action qui affiche la notification ET recharge la page
        return {
            'type': 'ir.actions.client',
            'tag': 'display_notification',
            'params': {
                'title': 'Commande créée avec succès',
                'message': f'La commande a été créée avec succès. {self.points_used} points ont été déduits.',
                'sticky': False,
                'next': {
                    'type': 'ir.actions.act_window_close',
                }
            }
        }