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
export default {
    name: "SchemaUpdate",
    components: { SchemaConstant, SchemaInput, AppModal },
    props: {
        id: [ String, Number ],
        index: [ String, Number ],
        schemaIndex: [ String, Number ],
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
            let model = {
                value: this.$options.filters.schemaValue(this.schema)
            }
            if (this.hasOperation) {
                model.operation = this.operationSchema
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
        schema: function () {
            if (!this.component) {
                return undefined
            }
            if (!this.component.schema.items[this.schemaIndex * 2]) {
                return undefined
            }
            
            return this.component.schema.items[this.schemaIndex * 2]
        },
        operationSchema: function () {
            if (!this.component) {
                return undefined
            }
            if (!this.component.schema.items[this.schemaIndex * 2 - 1]) {
                return undefined
            }
            return this.component.schema.items[this.schemaIndex * 2 - 1]
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
                schemaIndex: this.schemaIndex * 2,
                value: data
            })
            this.close()
        },
        remove: function () {
            this.$store.dispatch('draft/removeSchema', {
                index: this.index,
                schemaIndex: this.schemaIndex * 2
            })
            this.close()
        }
    }
};
</script>

<style></style>
