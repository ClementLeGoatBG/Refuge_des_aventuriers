from odoo import http, fields
from odoo.http import request
import logging
from datetime import datetime

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

    @http.route("/refuge/get_restaurant_data", type="json", auth="public", csrf=False)
    def get_restaurant_data(self, **kwargs):
        """Récupère toutes les données nécessaires en une seule requête"""
        try:
            # Trouver la première session POS ouverte
            pos_session = request.env['pos.session'].sudo().search([
                ('state', '=', 'opened')
            ], limit=1, order='start_at desc')

            if not pos_session:
                return {
                    'success': False,
                    'message': 'Aucune session POS ouverte trouvée'
                }

            # Récupérer toutes les tables du restaurant
            tables = request.env['restaurant.table'].sudo().search([])
            tables_data = [{
                'id': table.id,
                'name': table.name,
                'floor_name': table.floor_id.name,
                'seats': table.seats,
                'active': table.active,
                'pos_session_id': pos_session.id
            } for table in tables]

            return {
                'success': True,
                'tables': tables_data,
                'pos_session': {
                    'id': pos_session.id,
                    'name': pos_session.name,
                    'config_id': pos_session.config_id.id
                }
            }

        except Exception as e:
            _logger.error(f"Error getting restaurant data: {str(e)}")
            return {
                'success': False,
                'message': f"Erreur serveur: {str(e)}"
            }

    @http.route("/refuge/submit_order", type="json", auth="public", csrf=False)
    def submit_order(self, **kwargs):
        try:
            # Conversion sécurisée des données
            def to_int(value, default=0):
                try:
                    return int(float(value))
                except:
                    return default

            def to_float(value, default=0.0):
                try:
                    return float(value)
                except:
                    return default

            # Données d'entrée
            table_id = to_int(kwargs.get("table_id"))
            items = kwargs.get("items", [])
            total = to_float(kwargs.get("total"))

            # Vérification de la table
            table = request.env['restaurant.table'].sudo().browse(table_id)
            if not table.exists():
                return {"success": False, "message": "Table introuvable"}

            # Session POS
            pos_session = request.env['pos.session'].sudo().search([
                ('state', '=', 'opened')
            ], limit=1, order='start_at desc')
            if not pos_session:
                return {"success": False, "message": "Aucune session POS ouverte"}

            # Partenaire
            partner = request.env['res.partner'].sudo().search([
                ('name', '=', 'Client Web')
            ], limit=1) or request.env['res.partner'].sudo().create({
                'name': 'Client Web',
                'company_type': 'company',
            })

            # Préparation des lignes
            order_lines = []
            for item in items:
                product = request.env['product.product'].sudo().browse(to_int(item.get("id")))
                if product.exists():
                    qty = to_float(item.get("quantity", 1))
                    price = to_float(item.get("price"))
                    order_lines.append((0, 0, {
                        'product_id': product.id,
                        'qty': qty,
                        'price_unit': price,
                        'price_subtotal': price * qty,
                        'price_subtotal_incl': price * qty,
                        'tax_ids': [(6, 0, product.taxes_id.ids)],
                    }))

            # Formatage correct de la date pour Odoo
            now_utc = fields.Datetime.now()
            date_order = now_utc.strftime("%Y-%m-%d %H:%M:%S")

            # Structure de données conforme à Odoo
            order_data = {
                'data': {
                    'name': f"WEB-{fields.Datetime.now().strftime('%Y%m%d-%H%M%S')}",
                    'pos_session_id': pos_session.id,
                    'partner_id': partner.id,
                    'table_id': table.id,
                    'user_id': pos_session.user_id.id,
                    'sequence_number': pos_session.order_count + 1,
                    'lines': order_lines,
                    'statement_ids': [],
                    'amount_total': total,
                    'amount_tax': 0.0,
                    'amount_paid': 0.0,
                    'amount_return': 0.0,
                    'date_order': fields.Datetime.now().strftime("%Y-%m-%d %H:%M:%S"),
                    'state': 'draft',
                    'creation_date': fields.Datetime.now().strftime("%Y-%m-%d %H:%M:%S"),
                    'uid': pos_session.user_id.id,
                    'fiscal_position_id': False,
                    'to_invoice': False,
                    'access_token': False,
                }
            }

            # Création de la commande
            order_ids = request.env['pos.order'].sudo().create_from_ui([order_data], draft=True)

            return {
                "success": True,
                "message": f"Commande créée pour la table {table.name}",
                "order_id": order_ids[0]['id'] if order_ids else None
            }

        except Exception as e:
            _logger.error(f"Erreur création commande: {str(e)}")
            return {
                "success": False,
                "message": f"Erreur technique: {str(e)}"
            }