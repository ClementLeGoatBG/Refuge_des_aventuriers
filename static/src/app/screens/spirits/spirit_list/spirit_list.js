/** @odoo-module */

import { Component } from "@odoo/owl";
import { registry } from "@web/core/registry";
import { useRefuge } from "@refuge_aventuriers/app/store/refuge_hook";
import { SpiritLine } from "@refuge_aventuriers/app/screens/spirits/spirit_list/spirit_line/spirit_line";
import { Header } from "@refuge_aventuriers/app/screens/header/header";
import { Footer } from "@refuge_aventuriers/app/screens/footer/footer";

export class SpiritListScreen extends Component {
    static template = "refuge_aventuriers.SpiritListScreen";
    static components = { SpiritLine, Header, Footer};


    setup() {
        this.refuge = useRefuge();
    }

}

registry.category("refuge_screens").add("SpiritListScreen", SpiritListScreen);