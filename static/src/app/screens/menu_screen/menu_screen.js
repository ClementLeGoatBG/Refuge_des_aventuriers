/** @odoo-module */

import { Component } from "@odoo/owl";
import { registry } from "@web/core/registry";
import { useRefuge } from "@refuge_aventuriers/app/store/refuge_hook";


export class MenuScreen extends Component {
    static template = "refuge_aventuriers.MenuScreen";

    setup() {
        this.refuge = useRefuge();
    }
}

registry.category("refuge_screens").add("MenuScreen", MenuScreen);
