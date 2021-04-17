<template>
    <component :is="vueComponent"
        v-bind="vueComponentProps"
        @close="close()"
        @submit="submit($event)"/>
</template>

<script>
import SchemaConstant from './SchemaConstant.vue';
import SchemaInput from './SchemaInput.vue';
import SchemaFunction from './SchemaFunction.vue';
export default {
    name: "SchemaCreate",
    components: { SchemaConstant, SchemaInput, SchemaFunction },
    props: {
        id: [ String, Number ],
        componentId: [ String, Number ],
        type: [ String ],
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
        vueComponent: function () {
            return this.vueComponents[this.type]
        },
        vueComponentProps: function () {
            return {
                model: this.model
            }
        },
        error: function () {
            if (!this.referenceSchema) {
                return 404
            }
            return false
        },
        model: function () {
            let model = {
                item: {}
            }
            if (this.hasOperation) {
                model.operation = '+'
            }
            return model
        },
        referenceSchema: function () {
            return this.$store.getters['draft/reference'](this.componentId, this.reference)
        },
        hasOperation: function () {
            if (!this.referenceSchema) {
                return false
            }
            return this.referenceSchema.items.length > 0
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

            this.$store.dispatch('draft/generateReference', {
                componentId: this.componentId,
                value: referenceData
            }).then((result) => {
                return this.$store.dispatch('draft/addSchemaItem', {
                    id: this.componentId,
                    reference: this.reference,
                    value: {
                        item: "reference:" + result,
                        operation: data.operation
                    }
                })
            }).then(() => {
                this.close()
            })
        }
    }
};
</script>

<style></style>
