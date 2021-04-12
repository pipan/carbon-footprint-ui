<template>
    <div>
        <app-modal v-if="error"
            :modal-title="error + ''"
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
        index: [ String, Number ],
        schemaIndex: [ String, Number ],
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
                model: this.model,
                enableRemove:true
            }
        },
        error: function () {
            if (!this.schema) {
                return 404
            }
            return false
        },
        model: function () {
            if (!this.referenceSchemaItem) {
                return {}
            }
            let model = {
                value: this.$options.filters.schemaValue(this.referenceSchemaItem)
            }
            if (this.hasOperation) {
                model.operation = this.referenceSchemaOperation
            }
            return model
        },
        draft: function () {
            return this.$store.getters['draft/model']
        },
        component: function () {
            if (!this.draft) {
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
        referenceSchemaItem: function () {
            if (!this.referenceSchema || !this.referenceSchema.items[this.schemaIndex * 2]) {
                return false
            }
            
            return this.referenceSchema.items[this.schemaIndex * 2]
        },
        referenceSchemaOperation: function () {
            if (!this.component || !this.referenceSchema.items[this.schemaIndex * 2 - 1]) {
                return false
            }
            return this.referenceSchema.items[this.schemaIndex * 2 - 1]
        },
        hasOperation: function () {
            return this.schemaIndex > 0
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
            this.$store.dispatch('draft/updateSchema', {
                index: this.index,
                reference: this.reference,
                schemaIndex: this.schemaIndex * 2,
                value: data
            })
            this.close()
        },
        remove: function () {
            this.$store.dispatch('draft/removeSchema', {
                index: this.index,
                reference: this.reference,
                schemaIndex: this.schemaIndex * 2
            })
            this.close()
        }
    }
};
</script>

<style></style>
