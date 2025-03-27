/** @odoo-module */

import { Component } from "@odoo/owl";
import { registry } from "@web/core/registry";
import { useRefuge } from "@refuge_aventuriers/app/store/refuge_hook";
import { Header } from "@refuge_aventuriers/app/screens/header/header";
import { Footer } from "@refuge_aventuriers/app/screens/footer/footer";

export class MenuScreen extends Component {
    static template = "refuge_aventuriers.MenuScreen";
    static components = { Header, Footer };

    setup() {
        this.refuge = useRefuge();
    }
}

registry.category("refuge_screens").add("MenuScreen", MenuScreen);