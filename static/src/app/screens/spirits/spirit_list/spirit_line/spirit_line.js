/** @odoo-module */

import { Component } from "@odoo/owl";

export class SpiritLine extends Component {
    static template = "refuge_aventuriers.SpiritLine";

    static props = {
        name: String,
        spiritId: Number,
        onClick: { type: Function, optional: true },
    };
}
