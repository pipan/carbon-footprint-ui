<template>
    <app-modal
        modal-title="Function"
        @click-outside="close()">
        <form @submit.prevent="submit()">
            <div class="modal__body">
                <schema-operation-input v-if="hasOperation"
                    :value="operation"
                    @change="innerModel.operation = $event"
                    class="gap-bottom--m row center"/>
                <model-autocomplete :value="value" @change="setValue($event)"></model-autocomplete>
            </div>
            <div class="modal__footer">
                <div class="row reverse flex">
                    <button type="submit" class="btn btn--primary">SET</button>
                    <div class="gap-right--m">
                        <button type="button" @click="close()" class="btn btn--secondary">CANCEL</button>
                    </div>
                </div>

                <div class="gap-right--m" v-if="enableRemove">
                    <button type="button" @click="remove()" class="btn btn--danger">REMOVE</button>
                </div>
            </div>
        </form>
    </app-modal>
</template>

<script>
import AppModal from "../../components/AppModal.vue";
import ModelAutocomplete from '../../components/ModelAutocomplete.vue';
import SchemaOperationInput from "../../components/SchemaOperationInput.vue";
export default {
    name: "SchemaFunction",
    components: { AppModal, SchemaOperationInput, ModelAutocomplete },
    props: {
        model: Object,
        enableRemove: {
            type: Boolean,
            default: false
        }
    },
    data: function () {
        return {
            innerModel: {
                operation: '',
                value: null
            }
        }
    },
    computed: {
        value: function () {
            if (this.innerModel.value) {
                return this.innerModel.value
            }
            return this.model.value
        },
        draft: function () {
            return this.$store.getters['draft/model']
        },
        operation: function () {
            if (this.innerModel.operation) {
                return this.innerModel.operation
            }
            return this.model.operation
        },
        hasOperation: function () {
            return this.model.operation
        }
    },
    methods: {
        close: function () {
            this.$emit('close')
        },
        submit: function () {
            let payload = {
                item: {
                    type: 'function',
                    id: this.value.id,
                    model: this.value,
                    inputs: {}
                }
            }
            if (this.hasOperation) {
                payload.operation = this.operation
            }
            this.$emit('submit', payload)
        },
        remove: function () {
            this.$emit('remove')
        },
        setValue: function (value) {
            this.innerModel.value = value
        }

    }
};
</script>

<style></style>
