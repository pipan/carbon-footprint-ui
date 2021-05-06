<template>
    <app-modal
        modal-title="Input"
        @click-outside="close()">
        <form @submit.prevent="submit()">
            <div class="modal__body">
                <schema-operation-input v-if="hasOperation"
                    :value="operation"
                    @change="innerModel.operation = $event"
                    class="gap-bottom--m row center"/>
                <div class="row">
                    <radio-input-group class="flex"
                        :options="radioInputs"
                        :value="value"
                        @change="set('value', $event.id)" />
                </div>
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
import RadioInputGroup from "../../components/RadioInputGroup.vue";
import SchemaOperationInput from "../../components/SchemaOperationInput.vue";
export default {
    name: "SchemaInput",
    components: { AppModal, SchemaOperationInput, RadioInputGroup },
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
                value: ''
            }
        }
    },
    computed: {
        value: function () {
            if (this.innerModel.value) {
                return this.innerModel.value
            }
            if (this.model.item.reference) {
                return this.model.item.reference
            }
            if (this.inputs.length > 0) {
                return this.inputs[0].reference
            }
            return ''
        },
        draft: function () {
            return this.$store.getters['draft/model']
        },
        inputs: function () {
            if (!this.draft.inputs) {
                return []
            }
            return this.draft.inputs
        },
        radioInputs: function () {
            let result = []
            for (let input of this.inputs) {
                result.push({
                    id: input.reference,
                    name: input.name
                })
            }
            return result
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
        set: function(key, value) {
            let property = {}
            property[key] = value
            this.innerModel = Object.assign({}, this.innerModel, property)
        },
        close: function () {
            this.$emit('close')
        },
        submit: function () {
            let payload = {
                item: {
                    type: 'input',
                    reference: this.value
                }
            }
            if (this.hasOperation) {
                payload.operation = this.operation
            }
            this.$emit('submit', payload)
        },
        remove: function () {
            this.$emit('remove')
        }
    }
};
</script>

<style></style>
