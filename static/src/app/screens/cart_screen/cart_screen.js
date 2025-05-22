/** @odoo-module */

import { Component, useState, onWillStart } from "@odoo/owl";
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

        this.state = useState({
            tables: [],
            selectedTable: null,
            posSession: null,
            isLoading: false,
            error: null
        });

        onWillStart(async () => {
            await this.loadRestaurantData();
        });
    }

    async loadRestaurantData() {
        this.state.isLoading = true;
        this.state.error = null;

        try {
            const data = await this.rpc("/refuge/get_restaurant_data");

            if (data.success) {
                this.state.tables = data.tables;
                this.state.posSession = data.pos_session;
            } else {
                this.state.error = data.message;
            }
        } catch (error) {
            console.error("Error loading restaurant data:", error);
            this.state.error = "Erreur de connexion au serveur";
        } finally {
            this.state.isLoading = false;
        }
    }

    formatPrice(price) {
        return price.toFixed(2) + " €";
    }

    async submitOrder() {
        if (!this.state.selectedTable) {
            alert("Veuillez sélectionner une table");
            return;
        }

        // Conversion explicite des dates
        const formatDate = (date) => {
            return date.toISOString().replace('T', ' ').slice(0, 19);
        };

        this.state.isLoading = true;

        // Conversion explicite des données avant envoi
        const prepareNumber = (value) => {
            const num = Number(value);
            return isNaN(num) ? 0 : num;
        };

        const orderData = {
            table_id: prepareNumber(this.state.selectedTable.id),
            items: this.refuge.cart.map(item => ({
                id: prepareNumber(item.id),
                name: String(item.name),
                quantity: prepareNumber(item.quantity),
                price: prepareNumber(item.list_price),
            })),
            total: prepareNumber(this.refuge.getCartTotal()),
            date_order: formatDate(new Date()),  // Format compatible Odoo
        };

        try {
            const response = await this.rpc("/refuge/submit_order", orderData);
            if (response.success) {
                alert(`Commande #${response.order_id} créée avec succès`);
                this.refuge.clearCart();
                this.state.selectedTable = null;
            } else {
                alert(response.message);
            }
        } catch (error) {
            console.error("Erreur:", error);
            alert("Erreur technique - voir console");
        } finally {
            this.state.isLoading = false;
        }
    }
}

registry.category("refuge_screens").add("CartScreen", CartScreen);