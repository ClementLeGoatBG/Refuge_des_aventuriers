/** @odoo-module */

import { Component } from "@odoo/owl";

export class BeerLine extends Component {
    static template = "refuge_aventuriers.BeerLine";

    static props = {
        name: String,
        beerId: Number,
        imageUrl: String,
        onClick: { type: Function, optional: true },
    };
}
