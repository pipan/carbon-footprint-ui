<template>
    <div>
        <div class="row middle gap--m overflow-visible" :class="{'secondary': disabled}">
            <div class="flex">Schema</div>
            <div class="abs abs--right">
                <context-menu icon="add" ref="contextAdd" :disabled="disabled">
                    <div class="column left">
                        <button class="btn context__item" @click.stop="createSchema('const')">Constant</button>
                        <button v-if="hasInput" class="btn context__item" @click.stop="createSchema('input')">Input</button>
                        <button class="btn context__item" @click.stop="createSchema('function')">Function</button>
                    </div>
                </context-menu>
            </div>
        </div>
        <component-factor
            v-for="(factor, i) of factors"
            :key="i"
            :item="factor.item"
            :operation="factor.operation"
            :componentIndex="index"
            :disabled="disabled"
            @select="openSchema(i)"
            @selectInput="openInput(i, $event)"
            class="gap-h--m gap-v--tiny" />
    </div>
</template>

<script>
import ComponentFactor from './ComponentFactor.vue';
import ContextMenu from './ContextMenu.vue';
export default {
    name: 'SchemaStack',
    components: { ComponentFactor, ContextMenu },
    props: {
        index: [ String, Number ],
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
            let result = []
            for (let i = 0; i < this.items.length; i += 2) {
                result.push({
                    item: this.items[i],
                    operation: i > 0 ? this.items[i - 1] : false,
                })
            }
            return result
        },
        hasInput: function () {
            return this.inputs.length > 0
        }
    },
    methods: {
        createSchema: function (type) {
            this.$services.history.push({
                name: 'footprint.write.schema.create',
                params: {
                    type: type
                }
            })
            this.$refs.contextAdd.close()
        },
        openSchema: function (schemaIndex) {
            let type = this.$options.filters.schemaType(this.items[schemaIndex * 2])
            this.$services.history.push({
                name: 'footprint.write.schema',
                params: {
                    schemaIndex: schemaIndex,
                    type: type
                }
            })
        },
        openInput: function (schemaIndex, inputId) {
            let reference = this.factors[schemaIndex].item.inputs[inputId]
            if (!reference) {
                this.$store.dispatch('draft/generateReference', {
                    index: this.index,
                    reference: this.reference,
                    schemaIndex: schemaIndex * 2,
                    input: inputId
                }).then((result) => {
                    this.openReference(result)
                })
                return
            }

            this.openReference(reference)
        },
        openReference: function (reference) {
            this.$services.history.push({
                name: 'footprint.write.component.reference',
                params: {
                    reference: reference
                }
            })
        }
    }
}
</script>

<style></style>
