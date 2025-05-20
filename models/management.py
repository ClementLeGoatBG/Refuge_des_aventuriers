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
                'list_price',
                'description',
                'image_1920',
                'id',
                'categ_id'
            ]
        )

        # Ajouter l'URL de l'image pour chaque produit
        for product in products:
            if product.get('image_1920'):
                product[
                    # CHANGER LIEN IMG SI PLUS SUR LOCALHOST
                    'image_url'] = f"http://localhost:8070/web/image?model=product.template&id={product['id']}&field=image_1920"
            else:
                product['image_url'] = None

        return {
            "product.template": products,
        }