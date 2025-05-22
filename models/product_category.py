from odoo import models, fields

class ProductCategory(models.Model):
    _inherit = 'product.category'

    earn_points = fields.Integer(string="Points Gained", default=0)
    redeem_points = fields.Integer(string="Points Needed to Redeem", default=0)
