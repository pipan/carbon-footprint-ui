export default function (modelFetch) {
    return {
        namespaced: true,
        state: () => {
            return {
                og: {},
                draft: {
                    name: '',
                    description: '',
                    type: 9,
                    components: []
                },
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
            setComponents: function (state, data) {
                state.draft = Object.assign({}, state.draft, { components: data })
            },
            setComponentName: function (state, data) {
                let components = [...state.draft.components]
                components[data.index].name = data.value
                state.draft = Object.assign({}, state.draft, { components: components })
            },
            addComponent: function (state, data) {
                let components = []
                if (state.draft.components) {
                    components = [...state.draft.components]
                }
                
                components.push(data)
                state.draft = Object.assign({}, state.draft, { components: components })
            },
            removeComponent: function (state, data) {
                let index = data.index
                if (!state.draft.components || !state.draft.components[index]) {
                    return
                }
                let components = [...state.draft.components]
                components.splice(index, 1)
                state.draft = Object.assign({}, state.draft, { components: components })
            },
            setOutput: function (state, data) {
                state.draft = Object.assign({}, state.draft, { output_unit_id: data })
            },
            setInput: function (state, data) {
                let valueCopy = Object.assign({}, data.value)
                let inputs = []
                if (state.draft.inputs) {
                    inputs = [...state.draft.inputs]
                } else {
                    inputs = [...state.og.inputs]
                }
                
                if (inputs[data.index]) {
                    inputs[data.index] = valueCopy
                } else {
                    inputs.push(valueCopy)
                }
                state.draft = Object.assign({}, state.draft, { inputs: inputs })
            },
            removeInput: function (state, index) {
                let inputs = []
                if (state.draft.inputs) {
                    inputs = [...state.draft.inputs]
                } else {
                    inputs = [...state.og.inputs]
                }
                
                if (!inputs.length === 0 || !inputs[index]) {
                    return
                }
                
                inputs.splice(index, 1)
                state.draft = Object.assign({}, state.draft, { inputs: inputs })
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
                    .then(response => {
                        if (response.ok) {
                            return response.json()
                        }
                        throw Error("somethings wrong");
                    })
                    .then(json => {
                        context.state.saving = false
                        context.commit('reset')
                        return json
                    })
            },
            update: function (context, id) {
                context.state.saving = true

                return modelFetch.update(id, context.getters.model)
                    .then(response => {
                        if (response.ok) {
                            return response.json()
                        }
                        throw Error("somethings wrong");
                    })
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
                    .then(response => response.json())
                    .then(json => {
                        context.commit('setType', {id: 9, name: 'Other'})
                        context.commit('setOg', json)
                    })
            },
            addSchema: function (context, data) {
                let state = context.state
                let components = []
                if (state.draft.components) {
                    components = [...state.draft.components]
                }
                
                if (components[data.index].schema.items.length > 0) {
                    components[data.index].schema.items.push(data.value.operation)
                }
                components[data.index].schema.items.push(data.value.item)
                context.commit('setComponents', components)
            },
            updateSchema: function (context, data) {
                let state = context.state
                let components = []
                if (state.draft.components) {
                    components = [...state.draft.components]
                }
                
                if (components[data.index].schema.items[data.schemaIndex - 1]) {
                    components[data.index].schema.items[data.schemaIndex - 1] = data.value.operation
                }
                components[data.index].schema.items[data.schemaIndex] = data.value.item
                context.commit('setComponents', components)
            },
            removeSchema: function (context, data) {
                let state = context.state
                let components = []
                if (state.draft.components) {
                    components = [...state.draft.components]
                }
                
                if (components[data.index].schema.items[data.schemaIndex - 1]) {
                    components[data.index].schema.items.splice(data.schemaIndex - 1, 2)
                } else {
                    components[data.index].schema.items.splice(data.schemaIndex, 2)
                }
                context.commit('setComponents', components)
            }
        }
    }
}