import Mutator from "./Mutator";

function getRandomReference(length) {
    const str = Math.floor(Math.random() * Math.pow(16, length)).toString(16);
    return "0".repeat(length - str.length) + str;
}

function getUniqueRandomReference(length, map) {
    let referenceId = ''
    do {
        referenceId = getRandomReference(length)
    } while (map[referenceId])
    return referenceId
}

export default function (modelFetch) {
    return {
        namespaced: true,
        state: () => {
            return {
                og: {},
                draft: {},
                init: {
                    name: '',
                    description: '',
                    output_unit_id: 9,
                    components: [],
                    inputs: []
                },
                saving: false
            }
        },
        getters: {
            model: function (state) {
                return Object.assign({}, state.init, state.og, state.draft)
            },
            inputMap: function (state, getters) {
                let map = {}
                for (let input of getters.model.inputs) {
                    map[input.reference] = input
                }
                return map
            },
            inputIndex: function (state, getters) {
                return (reference) => {
                    let inputs = getters.model.inputs
                    if (!inputs) {
                        return -1
                    }

                    for (let i = 0; i <inputs.length; i++) {
                        if (inputs[i].reference != reference) {
                            continue
                        }
                        return i
                    }
                    return -1
                }
            },
            input: function (state, getters) {
                return (id) => {
                    return getters.inputMap[id] ? getters.inputMap[id] : false
                }
            },
            componentMap: function (state, getters) {
                let map = {}
                for (let comopnent of getters.model.components) {
                    map[comopnent.id] = comopnent
                }
                return map
            },
            component: function (state, getters) {
                return (id) => {
                    return getters.componentMap[id] ? getters.componentMap[id] : false
                }
            },
            componentIndex: function (state, getters) {
                return (id) => {
                    let model = getters.model
                    for (let i = 0; i < model.components.length; i++) {
                        if (model.components[i].id != id) {
                            continue
                        }
                        return i
                    }
                    return -1
                }
            },
            item: function (state, getters) {
                return (componentId, reference, index) => {
                    let referenceSchema = getters.reference(componentId, reference)
                    if (!referenceSchema || !referenceSchema.items || !referenceSchema.items[index]) {
                        return false
                    }

                    return referenceSchema.items[index]
                }
            },
            itemIndex: function (state, getters) {
                return (componentId, reference, itemReference) => {
                    let referenceSchema = getters.reference(componentId, reference)
                    if (!referenceSchema || !referenceSchema.items) {
                        return -1
                    }

                    let search = "reference:" + itemReference
                    for (let i = 0; i < referenceSchema.items.length; i++) {
                        if (referenceSchema.items[i] != search) {
                            continue
                        }
                        return i
                    }
                    return -1
                }
            },
            schema: function (state, getters) {
                return (id) => {
                    let component = getters.component(id)
                    if (!component || !component.schema) {
                        return false
                    }
                    return component.schema
                }
            },
            reference: function (state, getters) {
                return (componentId, reference) => {
                    let schema = getters.schema(componentId)
                    if (!schema || !schema[reference]) {
                        return false
                    }
                    return schema[reference]
                }
            }
        },
        mutations: {
            setDraft: function (state, data) {
                state.draft = data
            },
            setName: function (state, data) {
                state.draft = Object.assign({}, state.draft, { name: data })
            },
            setDescription: function (state, data) {
                state.draft = Object.assign({}, state.draft, { description: data })
            },
            setOutput: function (state, data) {
                state.draft = Object.assign({}, state.draft, { output_unit_id: data })
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
                        context.commit('setOg', json)
                    })
            },

            addInput: function (context, data) {
                data.value.reference = getUniqueRandomReference(8, context.getters.inputMap)
                let draft = Mutator.fromSource(context.getters.model)
                    .push('inputs', data.value)
                
                context.commit('setDraft', draft)
            },
            updateInput: function (context, data) {
                let draft = Mutator.fromSource(context.getters.model)
                    .arrayItem('inputs', context.getters.inputIndex(data.reference))
                    .updateAll(data.value)
                
                context.commit('setDraft', draft)
            },
            removeInput: function (context, index) {
                let draft = Mutator.fromSource(context.getters.model)
                    .arrayRemove('inputs', context.getters.inputIndex(index))
                
                context.commit('setDraft', draft)
            },

            createComponent: function (context) {
                let componentId = getUniqueRandomReference(8, context.getters.componentMap)
                let component = {
                    name: '-- new --',
                    id: componentId,
                    schema: {
                        root: {
                            type: 'stack',
                            items: []
                        }
                    }
                }

                let draft = Mutator.fromSource(context.getters.model)
                    .push('components', component)
                
                context.commit('setDraft', draft)
                return component
            },
            removeComponent: function (context, id) {
                let draft = Mutator.fromSource(context.getters.model)
                    .arrayRemove('components', context.getters.componentIndex(id))
                
                context.commit('setDraft', draft)
            },
            setComponentName: function (context, data) {
                let draft = Mutator.fromSource(context.getters.model)
                    .arrayItem('components', context.getters.componentIndex(data.id))
                    .update('name', data.value)
                
                context.commit('setDraft', draft)
            },

            updateReference: function (context, data) {
                let draft = Mutator.fromSource(context.getters.model)
                    .arrayItem('components', context.getters.componentIndex(data.id))
                    .property('schema')
                    .update(data.reference, data.value)
                
                context.commit('setDraft', draft)
            },
            addReference: function (context, data) {
                let draft = Mutator.fromSource(context.getters.model)
                    .arrayItem('components', context.getters.componentIndex(data.id))
                    .property('schema')
                    .update(data.reference, data.value)
                
                context.commit('setDraft', draft)
            },
            generateReference: function (context, data) {
                let referenceId = getUniqueRandomReference(8, context.getters.componentMap)

                let draft = Mutator.fromSource(context.getters.model)
                    .arrayItem('components', context.getters.componentIndex(data.componentId))
                    .property('schema')
                    .update(referenceId, data.value)

                context.commit('setDraft', draft)
                return referenceId
            },
            generateInputReference: function (context, data) {
                return context.dispatch('generateReference', {
                    componentId: data.componentId,
                    value: {
                        ...data,
                        type: 'model_input',
                        default: true,
                        items: []
                    }
                })
            },

            addSchemaItem: function (context, data) {
                let reference = context.getters.reference(data.id, data.reference)
                let items = [...reference.items]
                
                if (items.length > 0) {
                    items.push(data.value.operation)
                }
                items.push(data.value.item)

                context.dispatch('updateReference', {
                    id: data.id,
                    reference: data.reference,
                    value: { items: items }
                })
            },
            updateSchemaItem: function (context, data) {
                let reference = context.getters.reference(data.id, data.reference)
                let items = [...reference.items]

                items[data.index] = data.value

                context.dispatch('updateReference', {
                    id: data.id,
                    reference: data.reference,
                    value: { items: items }
                })
            },
            removeSchemaItem: function (context, data) {
                let reference = context.getters.reference(data.id, data.reference)
                let items = [...reference.items]
                let itemIndex = context.getters.itemIndex(data.id, data.reference, data.itemReference)

                if (itemIndex > 1) {
                    items.splice(itemIndex - 1, 2)
                } else {
                    items.splice(itemIndex, 2)
                }

                context.dispatch('updateReference', {
                    id: data.id,
                    reference: data.reference,
                    value: { items: items }
                })
            },

            setFunctionInput: function (context, data) {
                let draft = Mutator.fromSource(context.getters.model)
                    .arrayItem('components', context.getters.componentIndex(data.componentId))
                    .property('schema')
                    .property(data.reference)
                    .property('inputs')
                    .update(data.inputId, data.value)
                
                context.commit('setDraft', draft)
            },
            setInputDefault: function (context, data) {
                let draft = Mutator.fromSource(context.getters.model)
                    .arrayItem('components', context.getters.componentIndex(data.componentId))
                    .property('schema')
                    .update(data.reference, { default: data.value })
                
                context.commit('setDraft', draft)
            }
        }
    }
}