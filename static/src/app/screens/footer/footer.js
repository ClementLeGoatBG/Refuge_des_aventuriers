/** @odoo-module */

import { Component } from "@odoo/owl";
import { useRefuge } from "@refuge_aventuriers/app/store/refuge_hook";

export class Footer extends Component {
    static template = "refuge_aventuriers.Footer";

    setup() {
        this.refuge = useRefuge();
    }
}