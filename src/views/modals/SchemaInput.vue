<template>
    <app-modal
        modal-title="Input"
        @click-outside="close()">
        <form @submit.prevent="submit()">
            <div class="modal__body">
                <schema-operation-input v-if="hasOperation"
                    :value="operation"
                    @change="innerModel.operation = $event"
                    class="gap-bottom--m"/>
                <div class="row middle space-between">
                    <label class="label--inline">Input</label>
                    <select @change="innerModel.value = $event">
                        <option v-for="(input, index) of draft.inputs"
                            :key="index"
                            :value="input.name"
                            >{{ input.name }}</option>
                    </select>
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
import SchemaOperationInput from "../../components/SchemaOperationInput.vue";
export default {
    name: "SchemaInput",
    components: { AppModal, SchemaOperationInput },
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
                item: 'input:' + this.value
            }
            if (this.hasOperation) {
                payload.operation = this.operation
            }
            this.$emit('submit', payload)
        },
        remove: function () {
            this.$emit('remove')
        }
    },
    created: function () {
        if (!this.innerModel.value) {
            this.innerModel.value = this.draft.inputs[0].name
        }
    }
};
</script>

<style></style>
