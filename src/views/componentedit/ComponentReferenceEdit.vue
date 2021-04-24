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
        id: [ Number, String ],
        componentId: [ Number, String ],
        reference: {
            type: [ String ],
            default: 'root'
        }
    },
    data: function () {
        return {
            vueComponents: {
                root: 'component-root-edit',
                model_input: 'component-input-edit'
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
                componentId: this.componentId,
                reference: this.reference,
                component: this.component,
                schema: this.referenceSchema,
                footprintName: this.draft.name
            }
        },
        draft: function () {
            return this.$store.getters['draft/model']
        },
        component: function () {
            return this.$store.getters['draft/component'](this.componentId)
        },
        referenceSchema: function () {
            return this.$store.getters['draft/reference'](this.componentId, this.reference)
        },
        referenceType: function () {
            if (!this.referenceSchema || !this.referenceSchema.type) {
                return false
            }
            return this.referenceSchema.type
        }
    },
    created: function () {
        this.$services.draft.load(this.id)
    },
};
</script>

<style></style>
