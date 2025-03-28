/** @odoo-module */

import { Component } from "@odoo/owl";
import { registry } from "@web/core/registry";
import { useTetras } from "@tetras_school_management/app/store/tetras_hook";
import { GroupLine } from "@tetras_school_management/app/screens/groups/group_list/group_line/group_line";
export class GroupListScreen extends Component {
    static template = "tetras_school_management.GroupListScreen";
    static components = { GroupLine };


    setup() {
        this.tetras = useTetras();
    }

    async onGroupClick(group) {
        this.tetras.showScreen("GroupFormScreen", {"students": group.students})
//        this.tetras.showScreen("GroupFormScreen", {"student": student})
    }

}

registry.category("tetras_screens").add("GroupListScreen", GroupListScreen);
