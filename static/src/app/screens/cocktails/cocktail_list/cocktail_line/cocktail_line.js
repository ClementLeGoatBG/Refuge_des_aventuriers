/** @odoo-module */

import { Component } from "@odoo/owl";

export class CocktailLine extends Component {
    static template = "refuge_aventuriers.CocktailLine";

    static props = {
        name: String,
        cocktailPrice: Number,
        imageUrl: String,
        cocktailId: Number,
        onClick: { type: Function, optional: true },
    };
}
