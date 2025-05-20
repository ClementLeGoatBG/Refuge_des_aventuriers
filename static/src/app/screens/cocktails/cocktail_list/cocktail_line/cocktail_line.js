/** @odoo-module */

import { Component } from "@odoo/owl";

export class CocktailLine extends Component {
    static template = "refuge_aventuriers.CocktailLine";

    static props = {
        name: String,
        cocktailPrice: Number,
        imageUrl: { type: String, optional: true },
        cocktailId: Number,
        onClick: { type: Function, optional: true },
    };

    formatPrice(price) {
        return price.toFixed(2) + " €";
    }
}