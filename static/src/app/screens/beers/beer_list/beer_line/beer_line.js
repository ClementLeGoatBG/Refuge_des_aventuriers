/** @odoo-module */

import { Component } from "@odoo/owl";
import { useRefuge } from "@refuge_aventuriers/app/store/refuge_hook";

export class BeerLine extends Component {
    static template = "refuge_aventuriers.BeerLine";

    static props = {
        name: String,
        beerPrice: Number,
        imageUrl: { type: String, optional: true },
        beerId: Number,
        onClick: { type: Function, optional: true },
    };

    formatPrice(price) {
        return price.toFixed(2) + " €";
    }

    setup() {
        this.refuge = useRefuge();
    }

    onAddToCart(ev) {
        ev.stopPropagation();
        this.refuge.addToCart({
            id: this.props.beerId,
            name: this.props.name,
            list_price: this.props.beerPrice,
            image_url: this.props.imageUrl,
        });
    }
}