/** @odoo-module */

import { Component } from "@odoo/owl";
import { useRefuge } from "@refuge_aventuriers/app/store/refuge_hook";

export class WhiteWineLine extends Component {
    static template = "refuge_aventuriers.WhiteWineLine";

    static props = {
        name: String,
        whitewinePrice: Number,
        imageUrl: { type: String, optional: true },
        whitewineId: Number,
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
            id: this.props.whitewineId,
            name: this.props.name,
            list_price: this.props.whitewinePrice,
            image_url: this.props.imageUrl,
        });
    }

    onProductClick() {
        this.refuge.showScreen("ProductDetailScreen", { productId: this.props.whitewineId });
    }
}
