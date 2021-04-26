<template>
    <div>
        <div class="row middle gap--m overflow-visible" :class="{'secondary': disabled}">
            <div class="flex">Schema</div>
        </div>
        <schema-stack-item
            v-for="(factor, i) of factors"
            :key="i"
            :item="factor.item"
            :operation="factor.operation"
            :reference="factor.ref"
            :disabled="disabled"
            @selectItem="$emit('selectItem', $event)"
            @selectInput="openInput($event, factor.ref)"
            class="gap-h--m gap-v--tiny" />
        <div class="row gap--m center">
            <button @click="createSchema('constant')" class="btn btn--suggest">Constant</button>
            <div class="gap-left--m" v-if="hasInput">
                <button @click="createSchema('input')" class="btn btn--suggest">Input</button>
            </div>
            <div class="gap-left--m">
                <button @click="createSchema('model')" class="btn btn--suggest">Function</button>
            </div>
        </div>
    </div>
</template>

<script>
import SchemaStackItem from './SchemaStackItem.vue';

class ConstantAdapter {
    adapt(item) {
        return {
            name: item.value,
            tag: 'C',
            inputs: []
        }
    }
}

class InputAdapter {
    adapt(item) {
        return {
            name: item.name,
            tag: 'I',
            inputs: []
        }
    }
}

class FunctionAdapter {
    constructor(componentId, store) {
        this.componentId = componentId
        this.store = store
    }

    adapt(item) {
        let inputs = []
        for (let input of item.model.inputs) {
            let ref = ""
            if (item.inputs[input.reference]) {
                let inputSchema = item.inputs[input.reference]
                let split = inputSchema.split(":")
                ref = split.length > 1 ? split[1] : ref
            }
            let secondary = 'default'
            if (ref) {
                let funcionInput = this.store.getters['draft/reference'](this.componentId, ref)
                secondary = funcionInput.default ? 'default' : 'custom'
            }
            inputs.push({
                primary: input.name,
                secondary: secondary,
                ref: ref,
                uid: input.reference,
                id: input.id
            })
        }

        return {
            name: item.model.name,
            tag: 'F',
            inputs: inputs
        }
    }
}

class ItemAdapter {
    constructor(componentId, store) {
        this.adapters = {
            constant: new ConstantAdapter(),
            model: new FunctionAdapter(componentId, store),
            input: new InputAdapter()
        }
    }

    adapt(item) {
        return this.adapters[item.type].adapt(item)
    }
}

export default {
    name: 'SchemaStack',
    components: { SchemaStackItem },
    props: {
        componentId: [ Number, String ],
        reference: [ String ],
        items: [ Array ],
        inputs: [ Array ],
        disabled: {
            type: [ Boolean ],
            default: false
        }
    },
    computed: {
        factors: function () {
            let adapter = new ItemAdapter(this.componentId, this.$store)
            let result = []
            for (let i = 0; i < this.items.length; i += 2) {
                let split = this.items[i].split(":")
                let itemReference = this.$store.getters['draft/reference'](this.componentId, split[1])
                result.push({
                    ref: split[1],
                    item: adapter.adapt(itemReference),
                    operation: i > 0 ? this.items[i - 1] : '',
                })
            }
            return result
        },
        hasInput: function () {
            return this.inputs.length > 0
        }
    },
    methods: {
        openInput: function (input, parent) {
            if (!input.ref) {
                this.$store.dispatch('draft/generateInputReference', {
                    componentId: this.componentId,
                    parent: parent,
                    model: {
                        name: input.primary
                    }
                }).then((result) => {
                    return this.$store.dispatch('draft/setFunctionInput', {
                        componentId: this.componentId,
                        reference: parent,
                        inputId: input.uid,
                        value: "reference:" + result
                    }).then(() => {
                        this.$emit('selectReference', result)
                    })
                })
                return
            }

            this.$emit('selectReference', input.ref)
        },
        createSchema: function (type) {
            this.$services.history.push({
                name: 'footprint.write.schema.create',
                params: {
                    type: type
                }
            })
        }
    }
}
</script>

<style></style>
