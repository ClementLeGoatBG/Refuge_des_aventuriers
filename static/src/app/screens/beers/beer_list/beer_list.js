/** @odoo-module */

import { Component } from "@odoo/owl";
import { registry } from "@web/core/registry";
import { useRefuge } from "@refuge_aventuriers/app/store/refuge_hook";
import { BeerLine } from "@refuge_aventuriers/app/screens/beers/beer_list/beer_line/beer_line";
export class BeerListScreen extends Component {
    static template = "refuge_aventuriers.BeerListScreen";
    static components = { BeerLine };


    setup() {
        this.refuge = useRefuge();
    }

}

registry.category("refuge_screens").add("BeerListScreen", BeerListScreen);