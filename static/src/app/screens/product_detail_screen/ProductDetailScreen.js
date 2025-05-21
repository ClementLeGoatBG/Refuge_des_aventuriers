/** @odoo-module */
import { Component } from "@odoo/owl";
import { registry } from "@web/core/registry";
import { useRefuge } from "@refuge_aventuriers/app/store/refuge_hook";
import { Header } from "@refuge_aventuriers/app/screens/header/header";
import { Footer } from "@refuge_aventuriers/app/screens/footer/footer";

export class ProductDetailScreen extends Component {
    static template = "refuge_aventuriers.ProductDetailScreen";
    static components = { Header, Footer };

    setup() {
        this.refuge = useRefuge();
        this.product = this.getProductDetails();
        this.quantity = 1;
    }

    getProductDetails() {
        const productId = this.props.productId;
        return this.refuge.products.find(product => product.id === productId);
    }

    formatPrice(price) {
        return price.toFixed(2) + " €";
    }

    onAddToCart() {
        this.refuge.addToCart({
            id: this.product.id,
            name: this.product.name,
            list_price: this.product.list_price,
            image_url: this.product.image_url,
        });
    }

    onBack() {
        this.refuge.back();
    }

    increaseQuantity() {
        this.quantity += 1;
        this.render();
    }

    decreaseQuantity() {
        if (this.quantity > 1) {
            this.quantity -= 1;
            this.render();
        }
    }

    addToCartWithQuantity() {
        for (let i = 0; i < this.quantity; i++) {
            this.onAddToCart();
        }
    }
}

registry.category("refuge_screens").add("ProductDetailScreen", ProductDetailScreen);