/** @odoo-module */

import { Component } from "@odoo/owl";

export class WineLine extends Component {
    static template = "refuge_aventuriers.WineLine";

    static props = {
        name: String,
        groupId: Number,
        onClick: { type: Function, optional: true },
    };
}
