/** @odoo-module */

import { Component } from "@odoo/owl";
import { registry } from "@web/core/registry";
import { useRefuge } from "@refuge_aventuriers/app/store/refuge_hook";
import { RedWineLine } from "@refuge_aventuriers/app/screens/redwines/redwine_list/redwine_line/redwine_line";
import { Header } from "@refuge_aventuriers/app/screens/header/header";
import { Footer } from "@refuge_aventuriers/app/screens/footer/footer";

export class RedWineListScreen extends Component {
    static template = "refuge_aventuriers.RedWineListScreen";
    static components = { RedWineLine, Header, Footer};


    setup() {
        this.refuge = useRefuge();
    }

}

registry.category("refuge_screens").add("RedWineListScreen", RedWineListScreen);