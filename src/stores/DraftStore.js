function getRandomReference(length) {
    const str = Math.floor(Math.random() * Math.pow(16, length)).toString(16);
    return "0".repeat(length - str.length) + str;
}

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
            },
            component: function (state, getters) {
                return (index) => {
                    if (!getters.model.components[index]) {
                        return false
                    }
                    return getters.model.components[index]
                }
            },
            schema: function (state, getters) {
                return (index) => {
                    if (!getters.component(index) || !getters.component(index).schema) {
                        return false
                    }
                    return getters.component(index).schema
                }
            },
            reference: function (state, getters) {
                return (componentIndex, reference) => {
                    if (!getters.schema(componentIndex) || !getters.schema(componentIndex)[reference]) {
                        return false
                    }
                    return getters.schema(componentIndex)[reference]
                }
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
            setComponent: function (context, data) {
                let state = context.state
                let components = []
                if (state.draft.components) {
                    components = [...state.draft.components]
                }

                components[data.index] = data.value
                context.commit('setComponents', components)
            },
            setSchema: function (context, data) {
                let component = context.getters.component(data.index)
                if (!component) {
                    component = {}
                }

                context.dispatch('setComponent', {
                    index: data.index,
                    value: Object.assign({}, component, { schema: data.value })
                })
            },
            setReferenceSchema: function (context, data) {
                let schema = context.getters.schema(data.index)
                if (!schema) {
                    schema = {}
                }

                let reference = {}
                reference[data.reference] = Object.assign({}, schema[data.reference], data.value)

                context.dispatch('setSchema', {
                    index: data.index,
                    value: Object.assign({}, schema, reference)
                })
            },
            addSchema: function (context, data) {
                let reference = context.getters.reference(data.index, data.reference)
                let items = []
                if (reference.items) {
                    items = [...reference.items]
                }
                
                if (items.length > 0) {
                    items.push(data.value.operation)
                }
                items.push(data.value.item)

                context.dispatch('setReferenceSchema', {
                    index: data.index,
                    reference: data.reference,
                    value: { items: items }
                })
            },
            updateSchema: function (context, data) {                
                let reference = context.getters.reference(data.index, data.reference)
                let items = []
                if (reference.items) {
                    items = [...reference.items]
                }
                
                if (items[data.schemaIndex - 1]) {
                    items[data.schemaIndex - 1] = data.value.operation
                }
                items[data.schemaIndex] = data.value.item
                
                context.dispatch('setReferenceSchema', {
                    index: data.index,
                    reference: data.reference,
                    value: { items: items }
                })
            },
            removeSchema: function (context, data) {                
                let reference = context.getters.reference(data.index, data.reference)
                let items = []
                if (reference.items) {
                    items = [...reference.items]
                }
                
                if (items[data.schemaIndex - 1]) {
                    items.splice(data.schemaIndex - 1, 2)
                } else {
                    items.splice(data.schemaIndex, 2)
                }
                
                context.dispatch('setReferenceSchema', {
                    index: data.index,
                    reference: data.reference,
                    value: { items: items }
                })
            },
            generateReference: function (context, data) {
                let referenceId = ''
                do {
                    referenceId = getRandomReference(8)
                } while (context.getters.reference(data.index, referenceId) !== false)

                let reference = context.getters.reference(data.index, data.reference)
                let items = []
                if (reference.items) {
                    items = [...reference.items]
                }

                items[data.schemaIndex].inputs[data.input] = referenceId
                
                context.dispatch('setReferenceSchema', {
                    index: data.index,
                    reference: data.reference,
                    value: { items: items }
                })

                context.dispatch('setReferenceSchema', {
                    index: data.index,
                    reference: referenceId,
                    value: {
                        type: 'input',
                        default: true,
                        items: []
                    }
                })

                return referenceId
            },
            setInputDefault: function (context, data) {
                context.dispatch('setReferenceSchema', {
                    index: data.index,
                    reference: data.reference,
                    value: { default: data.value }
                })
            }
        }
    }
}