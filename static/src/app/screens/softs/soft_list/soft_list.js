/** @odoo-module */

import { Component } from "@odoo/owl";
import { registry } from "@web/core/registry";
import { useRefuge } from "@refuge_aventuriers/app/store/refuge_hook";
import { SoftLine } from "@refuge_aventuriers/app/screens/softs/soft_list/soft_line/soft_line";
export class SoftListScreen extends Component {
    static template = "refuge_aventuriers.SoftListScreen";
    static components = { SoftLine };


    setup() {
        this.refuge = useRefuge();
    }

}

registry.category("refuge_screens").add("SoftListScreen", SoftListScreen);