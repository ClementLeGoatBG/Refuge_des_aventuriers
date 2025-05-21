/** @odoo-module */

import { Component } from "@odoo/owl";
import { useRefuge } from "@refuge_aventuriers/app/store/refuge_hook";

export class CocktailLine extends Component {
    static template = "refuge_aventuriers.CocktailLine";

    static props = {
        name: String,
        cocktailPrice: Number,
        imageUrl: { type: String, optional: true },
        cocktailId: Number,
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
            id: this.props.cocktailId,
            name: this.props.name,
            list_price: this.props.cocktailPrice,
            image_url: this.props.imageUrl,
        });
    }

    onProductClick() {
        this.refuge.showScreen("ProductDetailScreen", { productId: this.props.cocktailId });
    }
}