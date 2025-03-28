from odoo import fields, models

class ResUsers(models.Model):
    _inherit = "res.users";
    fields.Integer("Points", readonly=True, default= 0 );
