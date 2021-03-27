<template>
    <component :is="vueComponent"
        v-bind="vueComponentProps"
        @close="close()"
        @submit="submit($event)"/>
</template>

<script>
import SchemaConstant from './SchemaConstant.vue';
import SchemaInput from './SchemaInput.vue';
export default {
    name: "SchemaCreate",
    components: { SchemaConstant, SchemaInput },
    props: {
        id: [ String, Number ],
        index: [ String, Number ],
        type: [ String ]
    },
    data: function () {
        return {
            vueComponents: {
                const: 'schema-constant',
                input: 'schema-input'
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
            if (!this.draft) {
                return undefined
            }
            return this.draft.components[this.index]
        },
        hasOperation: function () {
            if (!this.component) {
                return false
            }
            return this.component.schema.items.length > 0
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
                value: data
            })
            this.close()
        }
    }
};
</script>

<style></style>
