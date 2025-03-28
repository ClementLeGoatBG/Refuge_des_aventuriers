from odoo import api, fields, models

class RefugeManagement(models.Model):
    _name = "refuge.management"
    _description = "Refuge Management"

    @api.model
    def load_refuge_data(self):
        """
        Charge les données principales pour l'application
        """
        return {
            "product.template": self.env["product.template"].search_read(
                # Utilisez les champs réels de votre modèle refuge.product
                fields=[
                    'name',
                    'categ_id',
                    # 'sale_price',
                    # 'cost_price',
                    # 'product_type',
                    # 'volume',
                    'id'
                ]
            ),
        }