<template>
    <div>
        <app-modal v-if="error"
            :modal-title="error"
            @click-outside="close()">
            <div class="modal__footer">
                <div class="row reverse flex">
                    <button type="button" @click="close()" class="btn btn--secondary">CLOSE</button>
                </div>
            </div>
        </app-modal>
        <component v-if="!error"
            :is="vueComponent"
            v-bind="vueComponentProps"
            @close="close()"
            @submit="submit($event)"
            @remove="remove()"/>
    </div>
</template>

<script>
import SchemaConstant from './SchemaConstant.vue';
import SchemaInput from './SchemaInput.vue';
import AppModal from '../../components/AppModal.vue';
import SchemaFunction from './SchemaFunction.vue';
export default {
    name: "SchemaUpdate",
    components: { SchemaConstant, SchemaInput, SchemaFunction, AppModal },
    props: {
        id: [ String, Number ],
        componentId: [ String, Number ],
        itemReference: [ String ],
        reference: [ String ]
    },
    data: function () {
        return {
            vueComponents: {
                constant: 'schema-constant',
                input: 'schema-input',
                model: 'schema-function'
            }
        }
    },
    computed: {
        type: function () {
            if (!this.itemSchema) {
                return ''
            }
            return this.itemSchema.type
        },
        vueComponent: function () {
            return this.vueComponents[this.type]
        },
        vueComponentProps: function () {
            return {
                model: this.model,
                enableRemove: true
            }
        },
        error: function () {
            if (!this.itemSchema) {
                return '404'
            }
            return false
        },
        model: function () {
            if (!this.itemSchema) {
                return {
                    item: {}
                }
            }
            let model = {
                item: this.itemSchema
            }
            if (this.hasOperation) {
                model.operation = this.operation
            }
            return model
        },
        itemSchema: function () {
            return this.$store.getters['draft/reference'](this.componentId, this.itemReference)
        },
        itemIndex: function () {
            return this.$store.getters['draft/itemIndex'](this.componentId, this.reference, this.itemReference)
        },
        operation: function () {
            if (this.itemIndex < 1) {
                return false
            }

            return this.$store.getters['draft/item'](this.componentId, this.reference, this.itemIndex - 1)
        },
        hasOperation: function () {
            return this.operation !== false
        }
    },
    methods: {
        close: function () {
            this.$services.history.back({
                name: 'footprint.write.component.reference'
            })
        },
        submit: function (data) {
            let referenceData = {...data.item, parent: this.reference }

            this.$store.dispatch('draft/updateReference', {
                id: this.componentId,
                reference: this.itemReference,
                value: referenceData
            }).then((result) => {
                let itemIndex = this.$store.getters['draft/itemIndex'](this.componentId, this.reference, this.itemReference)
                if (itemIndex < 1) {
                    return result
                }

                return this.$store.dispatch('draft/updateSchemaItem', {
                    id: this.componentId,
                    reference: this.reference,
                    index: itemIndex - 1,
                    value: data.operation
                })
            }).then(() => {
                this.close()
            })
        },
        remove: function () {
            this.$store.dispatch('draft/removeSchemaItem', {
                id: this.componentId,
                reference: this.reference,
                itemReference: this.itemReference,
            }).then(() => {
                this.close()
            })
        }
    }
};
</script>

<style></style>
