/** @odoo-module */

import { Component } from "@odoo/owl";
import { registry } from "@web/core/registry";
import { useRefuge } from "@refuge_aventuriers/app/store/refuge_hook";
import { WineLine } from "@refuge_aventuriers/app/screens/wines/wine_list/wine_line/wine_line";
export class WineListScreen extends Component {
    static template = "refuge_aventuriers.WineListScreen";
    static components = { WineLine };


    setup() {
        this.refuge = useRefuge();
    }

}

registry.category("refuge_screens").add("WineListScreen", WineListScreen);