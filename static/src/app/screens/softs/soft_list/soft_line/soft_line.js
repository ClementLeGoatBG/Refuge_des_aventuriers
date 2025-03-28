/** @odoo-module */

import { Component } from "@odoo/owl";

export class SoftLine extends Component {
    static template = "refuge_aventuriers.SoftLine";

    static props = {
        name: String,
        groupId: Number,
        onClick: { type: Function, optional: true },
    };
}
