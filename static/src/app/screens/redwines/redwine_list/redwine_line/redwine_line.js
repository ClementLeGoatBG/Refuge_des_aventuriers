/** @odoo-module */

import { Component } from "@odoo/owl";

export class RedWineLine extends Component {
    static template = "refuge_aventuriers.RedWineLine";

    static props = {
        name: String,
        redwineId: Number,
        onClick: { type: Function, optional: true },
    };
}
