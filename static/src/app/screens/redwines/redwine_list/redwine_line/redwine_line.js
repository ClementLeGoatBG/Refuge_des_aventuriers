/** @odoo-module */

import { Component } from "@odoo/owl";
import { useRefuge } from "@refuge_aventuriers/app/store/refuge_hook";

export class RedWineLine extends Component {
    static template = "refuge_aventuriers.RedWineLine";

    static props = {
        name: String,
        redwinePrice: Number,
        imageUrl: { type: String, optional: true },
        redwineId: Number,
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
            id: this.props.redwineId,
            name: this.props.name,
            list_price: this.props.redwinePrice,
            image_url: this.props.imageUrl,
        });
    }
}
