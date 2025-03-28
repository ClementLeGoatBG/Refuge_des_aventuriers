/** @odoo-module */

import { Component } from "@odoo/owl";
import { registry } from "@web/core/registry";
import { useRefuge } from "@refuge_aventuriers/app/store/refuge_hook";
import { CocktailLine } from "@refuge_aventuriers/app/screens/cocktails/cocktail_list/cocktail_line/cocktail_line";
export class CocktailListScreen extends Component {
    static template = "refuge_aventuriers.CocktailListScreen";
    static components = { CocktailLine };


    setup() {
        this.refuge = useRefuge();
    }

}

registry.category("refuge_screens").add("CocktailListScreen", CocktailListScreen);