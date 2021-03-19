export default class CreateBehavior {
    store = null;

    constructor(store) {
        this.store = store
    }

    load() {
        this.store.dispatch('draft/fill', {
            id: 'new',
            name: 'New Footprint',
            output_unit_id: 9,
            type: {
                id: 1,
                name: 'Other'
            },
            description: "",
            inputs: {},
            components: {}
        })
    }

    save() {
        return this.store.dispatch('draft/create')
    }
}