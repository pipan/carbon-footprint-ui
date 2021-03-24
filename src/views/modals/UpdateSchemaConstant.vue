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
        <schema-constant v-if="!error"
            :model="model"
            :enableRemove="true"
            @close="close()"
            @submit="submit($event)"
            @remove="remove()"/>
    </div>
</template>

<script>
import SchemaConstant from './SchemaConstant.vue';
import AppModal from '../../components/AppModal.vue';
export default {
    name: "UpdateSchemaConstant",
    components: { SchemaConstant, AppModal },
    props: {
        id: [ String, Number ],
        index: [ String, Number ],
        schemaIndex: [ String, Number ]
    },
    computed: {
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
            data.item = 'const:' + data.item
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
