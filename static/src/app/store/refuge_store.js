/** @odoo-module */
import { Reactive } from "@web/core/utils/reactive";
import { registry } from "@web/core/registry";

export class RefugeStore extends Reactive {
    mainScreen = { name: null, component: null };
    screenHistory = []; // Initialisation de l'historique des écrans
    static serviceDependencies = [
        "orm",
    ];

    constructor() {
        super();
        this.ready = this.setup(...arguments).then(() => this);
    }

    async setup(env, { orm }) {
        this.env = env;
        this.orm = orm;

        await this.load_server_data();

        this.showScreen("MainScreen"); // Initialisation de l'écran principal
    }

    async load_server_data() {
        const loadedData = await this.orm.silent.call("refuge.management", "load_refuge_data", []);
        await this._processData(loadedData);
    }

    async _processData(loadedData) {
        this.products = loadedData["product.template"];
        return true; // TODO: Traitement des données à faire
    }

    // Méthode pour afficher un écran
    showScreen(name, props) {
        // Si un écran est déjà affiché, on l'ajoute à l'historique
        if (this.mainScreen.name) {
            this.screenHistory.push(this.mainScreen);
        }

        // Récupérer le composant de l'écran à afficher
        const component = registry.category("refuge_screens").get(name);
        this.mainScreen = { name, component, props };  // Met à jour l'écran principal
    }

    // Méthode pour revenir à l'écran précédent
    back() {
        if (this.screenHistory.length > 0) {
            // Récupérer l'écran précédent de l'historique
            const previousScreen = this.screenHistory.pop();
            this.mainScreen = previousScreen;  // Met à jour l'écran principal avec l'écran précédent
        }
    }
}

export const refugeService = {
    dependencies: RefugeStore.serviceDependencies,
    async start(env, deps) {
        return new RefugeStore(env, deps).ready;
    },
};

registry.category("services").add("refuge", refugeService);
