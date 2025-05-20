/** @odoo-module */

import { Component } from "@odoo/owl";
import { registry } from "@web/core/registry";
import { useRefuge } from "@refuge_aventuriers/app/store/refuge_hook";
import { Header } from "@refuge_aventuriers/app/screens/header/header";
import { Footer } from "@refuge_aventuriers/app/screens/footer/footer";

export class CartScreen extends Component {
    static template = "refuge_aventuriers.CartScreen";
    static components = { Header, Footer };

    setup() {
        this.refuge = useRefuge();
    }

    formatPrice(price) {
        return price.toFixed(2) + " €";
    }
}

registry.category("refuge_screens").add("CartScreen", CartScreen);