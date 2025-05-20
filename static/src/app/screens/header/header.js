/** @odoo-module */

import { Component } from "@odoo/owl";
import { useRefuge } from "@refuge_aventuriers/app/store/refuge_hook";

export class Header extends Component {
    static template = "refuge_aventuriers.Header";

    setup() {
        this.refuge = useRefuge();
    }

    get totalQuantity() {
        return this.refuge.cart.reduce((sum, item) => sum + item.quantity, 0);
    }
}