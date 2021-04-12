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
        index: [ String, Number ],
        type: [ String ],
        reference: [ String ]
    },
    data: function () {
        return {
            vueComponents: {
                const: 'schema-constant',
                input: 'schema-input',
                function: 'schema-function'
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
            if (!this.component) {
                return 404
            }
            return false
        },
        model: function () {
            let model = {
                value: ''
            }
            if (this.hasOperation) {
                model.operation = '+'
            }
            return model
        },
        draft: function () {
            return this.$store.getters['draft/model']
        },
        component: function () {
            if (!this.draft || !this.draft.components[this.index]) {
                return false
            }
            return this.draft.components[this.index]
        },
        schema: function () {
            if (!this.component || !this.component.schema) {
                return false
            }
            return this.component.schema
        },
        referenceSchema: function () {
            if (!this.schema || !this.schema[this.reference]) {
                return false
            }
            return this.schema[this.reference]
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
                name: 'footprint.write.component',
                params: {
                    id: this.id,
                    index: this.index
                }
            })
        },
        submit: function (data) {
            this.$store.dispatch('draft/addSchema', {
                index: this.index,
                reference: this.reference,
                value: data
            })
            this.close()
        }
    }
};
</script>

<style></style>
