/** @odoo-module */

import { Component, useState } from "@odoo/owl";
import { useService } from "@web/core/utils/hooks";
import { registry } from "@web/core/registry";
import { useRefuge } from "@refuge_aventuriers/app/store/refuge_hook";
import { Header } from "@refuge_aventuriers/app/screens/header/header";
import { Footer } from "@refuge_aventuriers/app/screens/footer/footer";

export class CartScreen extends Component {
    static template = "refuge_aventuriers.CartScreen";
    static components = { Header, Footer };

    setup() {
        this.refuge = useRefuge();
        this.rpc = useService("rpc");

        // variable réactive pour t-model
        this.state = useState({
            tableNumber: "",
        });
    }

    formatPrice(price) {
        return price.toFixed(2) + " €";
    }

    async submitOrder() {
        if (!this.state.tableNumber) {
            alert("Veuillez saisir le numéro de table.");
            return;
        }

        const orderData = {
            table_number: this.state.tableNumber,
            items: this.refuge.cart.map(item => ({
                id: item.id,
                name: item.name,
                quantity: item.quantity,
                price: item.list_price,
            })),
            total: this.refuge.getCartTotal(),
        };

        try {
            const response = await this.rpc("/refuge/submit_order", orderData);
            if (response.success) {
                alert(`Commande enregistrée ! Rendez-vous au bar avec le numéro de table ${this.state.tableNumber}.`);
                this.refuge.clearCart();
                this.state.tableNumber = ""; // reset input
            } else {
                alert("Une erreur est survenue.");
            }
        } catch (error) {
            console.error("Erreur lors de la commande :", error);
            alert("Échec de l'envoi de la commande.");
        }
    }
}

registry.category("refuge_screens").add("CartScreen", CartScreen);