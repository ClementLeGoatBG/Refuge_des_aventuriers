/** @odoo-module */

import { Component } from "@odoo/owl";
import { registry } from "@web/core/registry";
import { useTetras } from "@tetras_school_management/app/store/tetras_hook";
import { StudentLine } from "@tetras_school_management/app/screens/students/student_list/student_line/student_line";

export class GroupFormScreen extends Component {
    static template = "tetras_school_management.GroupFormScreen";
    static components = { StudentLine };

    setup() {
        this.tetras = useTetras();
        console.log(this.props.students)
    }

    async onStudentClick(student) {
       this.tetras.showScreen("StudentFormScreen", {"student": student})
    }

}

registry.category("tetras_screens").add("GroupFormScreen", GroupFormScreen);
