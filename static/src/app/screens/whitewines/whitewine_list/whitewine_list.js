/** @odoo-module */

import { Component } from "@odoo/owl";
import { registry } from "@web/core/registry";
import { useRefuge } from "@refuge_aventuriers/app/store/refuge_hook";
import { WhiteWineLine } from "@refuge_aventuriers/app/screens/whitewines/whitewine_list/whitewine_line/whitewine_line";
import { Header } from "@refuge_aventuriers/app/screens/header/header";
import { Footer } from "@refuge_aventuriers/app/screens/footer/footer";

export class WhiteWineListScreen extends Component {
    static template = "refuge_aventuriers.WhiteWineListScreen";
    static components = { WhiteWineLine, Header, Footer};


    setup() {
        this.refuge = useRefuge();
    }

}

registry.category("refuge_screens").add("WhiteWineListScreen", WhiteWineListScreen);