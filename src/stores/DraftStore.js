export default function (modelFetch) {
    return {
        namespaced: true,
        state: () => {
            return {
                og: {},
                draft: {},
                saving: false
            }
        },
        getters: {
            model: function (state) {
                return Object.assign({}, state.og, state.draft)
            }
        },
        mutations: {
            setName: function (state, data) {
                state.draft = Object.assign({}, state.draft, { name: data })
            },
            setType: function (state, data) {
                state.draft = Object.assign({}, state.draft, { type: data })
            },
            setDescription: function (state, data) {
                state.draft = Object.assign({}, state.draft, { description: data })
            },
            setOg: function (state, data) {
                state.og = Object.assign({}, data)
            },
            reset: function (state) {
                state.draft = {}
            }
        },
        actions: {
            create: function (context) {
                context.state.saving = true

                return modelFetch.create(context.getters.model)
                    .then(json => {
                        context.state.saving = false
                        context.commit('reset')
                        return json
                    })
            },
            update: function (context, id) {
                context.state.saving = true

                return modelFetch.update(id, context.getters.model)
                    .then(json => {
                        context.state.saving = false
                        context.commit('reset')
                        return json
                    })
            },
            fill: function (context, data) {
                if (data.id != context.state.og.id) {
                    context.commit('reset')
                }
                context.commit('setOg', data)
            },
            load: function (context, id) {
                if (id != context.state.og.id) {
                    context.commit('reset')
                }
                modelFetch.get(id)
                    .then(json => {
                        context.commit('setType', {id: 9, name: 'Other'})
                        context.commit('setOg', json)
                    })
            }
        }
    }
}