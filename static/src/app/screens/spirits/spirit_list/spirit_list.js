/** @odoo-module */

import { Component } from "@odoo/owl";
import { registry } from "@web/core/registry";
import { useRefuge } from "@refuge_aventuriers/app/store/refuge_hook";
import { SpiritLine } from "@refuge_aventuriers/app/screens/spirits/spirit_list/spirit_line/spirit_line";
export class SpiritListScreen extends Component {
    static template = "refuge_aventuriers.SpiritListScreen";
    static components = { SpiritLine };


    setup() {
        this.refuge = useRefuge();
    }

}

registry.category("refuge_screens").add("SpiritListScreen", SpiritListScreen);