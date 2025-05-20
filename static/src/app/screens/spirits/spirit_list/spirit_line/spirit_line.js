/** @odoo-module */

import { Component } from "@odoo/owl";

export class SpiritLine extends Component {
    static template = "refuge_aventuriers.SpiritLine";

    static props = {
        name: String,
        spiritPrice: Number,
        imageUrl: { type: String, optional: true },
        spiritId: Number,
        onClick: { type: Function, optional: true },
    };

    formatPrice(price) {
        return price.toFixed(2) + " €";
    }
}
