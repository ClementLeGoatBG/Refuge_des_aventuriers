from odoo import api, fields, models

class RefugeManagement(models.Model):
    _name = "refuge.management"
    _description = "Refuge Management"

    @api.model
    def load_refuge_data(self):
        """
        Charge les données principales pour l'application
        """
        products = self.env["product.template"].search_read(
            fields=[
                'name',
                'categ_id',
                'id',
                'image_1920',
                # 'sale_price',
                # 'cost_price',
                # 'product_type',
                # 'volume',
            ]
        )

        # Ajouter l'URL de l'image pour chaque produit
        for product in products:
            if product.get('image_1920'):
                product[
                    'image_url'] = f"http://localhost:8070/web/image?model=product.template&id={product['id']}&field=image_1920"
            else:
                product['image_url'] = None  # Si aucune image, valeur par défaut

        return {
            "product.template": products,
        }