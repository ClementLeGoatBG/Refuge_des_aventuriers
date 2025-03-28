/** @odoo-module */

import { Component } from "@odoo/owl";
import { registry } from "@web/core/registry";
import { useRefuge } from "@refuge_aventuriers/app/store/refuge_hook";

export class WineFormScreen extends Component {
    static template = "refuge_aventuriers.WineFormScreen";

    setup() {
        this.refuge = useRefuge();
    }

}

registry.category("refuge_screens").add("WineFormScreen", WineFormScreen);