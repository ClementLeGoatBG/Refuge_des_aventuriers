from odoo import models, api

class PosOrder(models.Model):
    _inherit = 'pos.order'

    def _process_loyalty(self, order):
        points = 0
        for line in order.lines:
            category = line.product_id.categ_id
            points += category.earn_points * line.qty
        if order.partner_id:
            order.partner_id.loyalty_points += int(points)

    def action_pos_order_paid(self):
        # Appeler la méthode originale pour valider la commande
        res = super(PosOrder, self).action_pos_order_paid()

        # Ajouter votre logique personnalisée ici
        for order in self:
            # Exemple : Traiter la fidélité
            self._process_loyalty(order)

        return res
