<template>
    <div>
        <not-found v-if="!vueComponent" />
        <component :is="vueComponent"
            v-bind="vueComponentProps"/>
    </div>
</template>

<script>
import ComponentRootEdit from "./ComponentRootEdit.vue"
import ComponentInputEdit from "./ComponentInputEdit.vue"
import NotFound from '../NotFound.vue'
export default {
    name: "ComponentReferenceEdit",
    components: { NotFound, ComponentRootEdit, ComponentInputEdit },
    props: {
        id: [ String, Number ],
        index: [ String, Number ],
        reference: [ String ]
    },
    data: function () {
        return {
            vueComponents: {
                root: 'component-root-edit',
                input: 'component-input-edit'
            }
        }
    },
    computed: {
        vueComponent: function () {
            if (this.reference === 'root') {
                return this.vueComponents.root
            }

            if (!this.referenceType || !this.vueComponents[this.referenceType]) {
                return false
            }

            return this.vueComponents[this.referenceType]
        },
        vueComponentProps: function () {
            return {
                id: this.id,
                index: this.index,
                reference: this.reference,
                schema: this.referenceSchema,
                modelName: this.draft.name
            }
        },
        draft: function () {
            return this.$store.getters['draft/model']
        },
        component: function () {
            if (!this.draft.components) {
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
            return this.$store.getters['draft/reference'](this.index, this.reference)
        },
        referenceType: function () {
            if (!this.referenceSchema || !this.referenceSchema.type) {
                return false
            }
            return this.referenceSchema.type
        }
    }
};
</script>

<style></style>
