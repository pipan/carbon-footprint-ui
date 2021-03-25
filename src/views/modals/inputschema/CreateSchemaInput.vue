<template>
    <schema-input :model="model"
        @close="close()"
        @submit="submit($event)"/>
</template>

<script>
import SchemaInput from './SchemaInput.vue';
export default {
    name: "CreateSchemaInput",
    components: { SchemaInput },
    props: {
        id: [ String, Number ],
        index: [ String, Number ]
    },
    computed: {
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
            data.item = 'const:' + data.item
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
