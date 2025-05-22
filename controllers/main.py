from odoo import http
from odoo.http import request
import logging

_logger = logging.getLogger(__name__)


class RefugeController(http.Controller):
    @http.route(["/refuge/web", "/refuge/ui"], type="http", auth="user")
    def refuge_web(self, **k):
        session_info = request.env["ir.http"].session_info()
        context = {
            "session_info": session_info
        }
        response = request.render("refuge_aventuriers.index", context)
        response.headers["Cache-Control"] = "no-store"
        return response

    @http.route("/refuge/submit_order", type="json", auth="public", csrf=False)
    def submit_order(self, **kwargs):
        try:
            table_number = kwargs.get("table_number")
            items = kwargs.get("items", [])
            total = kwargs.get("total", 0.0)

            # Log de la commande reçue
            _logger.info(f"Commande reçue - Table: {table_number}, Total: {total}, Produits: {items}")

            # Récupérer la session POS active (ou créer une session par défaut)
            pos_config = request.env['pos.config'].sudo().search([('name', '=', 'Refuge Aventuriers')], limit=1)
            if not pos_config:
                # Créer une configuration POS par défaut si elle n'existe pas
                pos_config = request.env['pos.config'].sudo().create({
                    'name': 'Refuge Aventuriers',
                    'journal_id': request.env['account.journal'].sudo().search([('type', '=', 'sale')], limit=1).id,
                    'pricelist_id': request.env['product.pricelist'].sudo().search([], limit=1).id,
                })

            # Récupérer ou créer une session POS
            pos_session = request.env['pos.session'].sudo().search([
                ('config_id', '=', pos_config.id),
                ('state', '=', 'opened')
            ], limit=1)

            if not pos_session:
                # Créer une nouvelle session si aucune n'est ouverte
                pos_session = request.env['pos.session'].sudo().create({
                    'config_id': pos_config.id,
                    'user_id': request.env.user.id,
                })
                pos_session.action_pos_session_open()

            # Créer la commande POS
            pos_order = request.env['pos.order'].sudo().create({
                'session_id': pos_session.id,
                'partner_id': False,  # Client anonyme
                'pricelist_id': pos_config.pricelist_id.id,
                'fiscal_position_id': False,
                'table_id': self._get_or_create_table(table_number),
                'amount_total': total,
                'amount_tax': 0.0,  # À calculer selon vos besoins
                'amount_paid': 0.0,
                'amount_return': 0.0,
                'pos_reference': f"Refuge-{table_number}-{pos_session.id}",
                'date_order': request.env.cr.now(),
                'state': 'draft',
            })

            # Ajouter les lignes de commande
            for item in items:
                product = request.env['product.product'].sudo().search([('id', '=', item.get('id'))], limit=1)
                if product:
                    request.env['pos.order.line'].sudo().create({
                        'order_id': pos_order.id,
                        'product_id': product.id,
                        'qty': item.get('quantity', 1),
                        'price_unit': item.get('price', 0.0),
                        'price_subtotal': item.get('price', 0.0) * item.get('quantity', 1),
                        'price_subtotal_incl': item.get('price', 0.0) * item.get('quantity', 1),
                    })

            # Optionnel : Confirmer la commande automatiquement
            # pos_order.action_pos_order_paid()

            _logger.info(f"Commande POS créée avec succès - ID: {pos_order.id}")

            return {
                "success": True,
                "message": f"Commande bien reçue pour la table {table_number}",
                "order_id": pos_order.id,
                "pos_reference": pos_order.pos_reference
            }

        except Exception as e:
            _logger.error(f"Erreur lors de la création de la commande POS: {str(e)}")
            return {
                "success": False,
                "message": f"Erreur lors de la création de la commande: {str(e)}"
            }

    def _get_or_create_table(self, table_number):
        """Récupère ou crée une table restaurant"""
        try:
            # Chercher si le module restaurant est installé
            restaurant_table = request.env['restaurant.table'].sudo().search([
                ('name', '=', f"Table {table_number}")
            ], limit=1)

            if not restaurant_table:
                # Créer la table si elle n'existe pas
                restaurant_floor = request.env['restaurant.floor'].sudo().search([], limit=1)
                if not restaurant_floor:
                    restaurant_floor = request.env['restaurant.floor'].sudo().create({
                        'name': 'Salle principale'
                    })

                restaurant_table = request.env['restaurant.table'].sudo().create({
                    'name': f"Table {table_number}",
                    'floor_id': restaurant_floor.id,
                    'seats': 4,  # Nombre de places par défaut
                })

            return restaurant_table.id
        except:
            # Si le module restaurant n'est pas installé, retourner False
            return False