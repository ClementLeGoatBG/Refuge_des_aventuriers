/** @odoo-module */

import { Component } from "@odoo/owl";
import { registry } from "@web/core/registry";
import { useRefuge } from "@refuge_aventuriers/app/store/refuge_hook";

export class SpiritFormScreen extends Component {
    static template = "refuge_aventuriers.SpiritFormScreen";

    setup() {
        this.refuge = useRefuge();
    }

}

registry.category("refuge_screens").add("SpiritFormScreen", SpiritFormScreen);