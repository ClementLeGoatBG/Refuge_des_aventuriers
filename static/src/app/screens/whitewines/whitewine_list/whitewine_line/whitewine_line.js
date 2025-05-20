/** @odoo-module */

import { Component } from "@odoo/owl";

export class WhiteWineLine extends Component {
    static template = "refuge_aventuriers.WhiteWineLine";

    static props = {
        name: String,
        whitewinePrice: Number,
        imageUrl: String,
        whitewineId: Number,
        onClick: { type: Function, optional: true },
    };
}
