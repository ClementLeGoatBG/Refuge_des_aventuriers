/** @odoo-module */

import { Component } from "@odoo/owl";

export class RedWineLine extends Component {
    static template = "refuge_aventuriers.RedWineLine";

    static props = {
        name: String,
        redwinePrice: Number,
        imageUrl: { type: String, optional: true },
        redwineId: Number,
        onClick: { type: Function, optional: true },
    };

    formatPrice(price) {
        return price.toFixed(2) + " €";
    }
}
