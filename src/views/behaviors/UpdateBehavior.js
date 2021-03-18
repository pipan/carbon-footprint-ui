export default class UpdateBehavior {
    store = null;

    constructor(store) {
        this.store = store
    }

    load(id) {
        this.store.dispatch('draft/load', id)
    }

    save(id) {
        return this.store.dispatch('draft/update', id)
    }
}