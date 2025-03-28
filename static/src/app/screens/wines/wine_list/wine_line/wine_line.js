/** @odoo-module */

import { Component } from "@odoo/owl";


export class GroupLine extends Component {
    static template = "tetras_school_management.GroupLine";

    static props = {
        name: String,
        groupId: Number,
        onClick: { type: Function, optional: true },
    };
}

