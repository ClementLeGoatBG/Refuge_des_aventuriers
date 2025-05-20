/** @odoo-module */

import { Component } from "@odoo/owl";
import { useRefuge } from "@refuge_aventuriers/app/store/refuge_hook";

export class SpiritLine extends Component {
    static template = "refuge_aventuriers.SpiritLine";

    static props = {
        name: String,
        spiritPrice: Number,
        imageUrl: { type: String, optional: true },
        spiritId: Number,
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
            id: this.props.spiritId,
            name: this.props.name,
            list_price: this.props.spiritPrice,
            image_url: this.props.imageUrl,
        });
    }
}
