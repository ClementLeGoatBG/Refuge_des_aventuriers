/** @odoo-module */

import { Component } from "@odoo/owl";
import { registry } from "@web/core/registry";
import { useRefuge } from "@refuge_aventuriers/app/store/refuge_hook";

export class RedWineFormScreen extends Component {
    static template = "refuge_aventuriers.RedWineFormScreen";

    setup() {
        this.refuge = useRefuge();
    }

}

registry.category("refuge_screens").add("RedWineFormScreen", RedWineFormScreen);