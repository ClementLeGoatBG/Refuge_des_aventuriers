/** @odoo-module */

import { Component } from "@odoo/owl";

export class BeerLine extends Component {
    static template = "refuge_aventuriers.BeerLine";

    static props = {
        name: String,
        groupId: Number,
        onClick: { type: Function, optional: true },
    };
}
