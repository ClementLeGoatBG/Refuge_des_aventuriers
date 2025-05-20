/** @odoo-module */
import { Reactive } from "@web/core/utils/reactive";
import { registry } from "@web/core/registry";

export class RefugeStore extends Reactive {
    mainScreen = { name: null, component: null };
    screenHistory = [];
    cart = []; // 🛒 Initialisation du panier

    static serviceDependencies = ["orm"];

    constructor() {
        super();
        this.ready = this.setup(...arguments).then(() => this);
    }

    async setup(env, { orm }) {
        this.env = env;
        this.orm = orm;

        await this.load_server_data();
        this.showScreen("MainScreen");
    }

    async load_server_data() {
        const loadedData = await this.orm.silent.call("refuge.management", "load_refuge_data", []);
        await this._processData(loadedData);
    }

    async _processData(loadedData) {
        this.products = loadedData["product.template"];
        return true;
    }

    // 📱 Navigation
    showScreen(name, props) {
        if (this.mainScreen.name) {
            this.screenHistory.push(this.mainScreen);
        }
        const component = registry.category("refuge_screens").get(name);
        this.mainScreen = { name, component, props };
    }

    back() {
        if (this.screenHistory.length > 0) {
            this.mainScreen = this.screenHistory.pop();
        }
    }

    // ✅ LOGIQUE PANIER

    addToCart(product) {
        const existing = this.cart.find((item) => item.id === product.id);
        if (existing) {
            existing.quantity += 1;
        } else {
            this.cart.push({ ...product, quantity: 1 });
        }
    }

    increaseQuantity(productId) {
        const item = this.cart.find((p) => p.id === productId);
        if (item) {
            item.quantity += 1;
        }
    }

    decreaseQuantity(productId) {
        const index = this.cart.findIndex((p) => p.id === productId);
        if (index !== -1) {
            const item = this.cart[index];
            item.quantity -= 1;
            if (item.quantity <= 0) {
                this.cart.splice(index, 1);
            }
        }
    }

    clearCart() {
        this.cart.length = 0;
    }

    getCartTotal() {
        return this.cart.reduce((total, item) => total + item.list_price * item.quantity, 0);
    }
}

export const refugeService = {
    dependencies: RefugeStore.serviceDependencies,
    async start(env, deps) {
        return new RefugeStore(env, deps).ready;
    },
};

registry.category("services").add("refuge", refugeService);