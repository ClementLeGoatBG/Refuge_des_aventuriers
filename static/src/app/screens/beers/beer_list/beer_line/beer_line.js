/** @odoo-module */

import { Component } from "@odoo/owl";

export class BeerLine extends Component {
    static template = "refuge_aventuriers.BeerLine";

    static props = {
        name: String,
        beerPrice: Number,
        imageUrl: String,
        beerId: Number,
        onClick: { type: Function, optional: true },
    };
}