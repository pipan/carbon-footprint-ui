<template>
    <app-modal
        modal-title="Constant"
        @click-outside="close()">
        <form @submit.prevent="submit()">
            <div class="modal__body">
                <div class="gap-bottom--m" v-if="hasOperation">
                    <label>Operation</label>
                    <input-swich-icon :options="operationOptions"
                        :value="operation"
                        @change="innerModel.operation = $event"/>
                </div>
                <div>
                    <label>Value</label>
                    <unit-input unitId="8"
                        :value="value"
                        @change="innerModel.value = $event"></unit-input>
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
import InputSwichIcon from "../../components/InputSwichIcon.vue";
import UnitInput from '../../components/UnitInput.vue';
export default {
    name: "SchemaConstant",
    components: { AppModal, InputSwichIcon, UnitInput },
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
            },
            unitId: 8,
            operationOptions: [
                {
                    value: '+',
                    icon: 'add'
                },
                {
                    value: '*',
                    icon: 'close'
                }
            ],
        }
    },
    computed: {
        value: function () {
            if (this.innerModel.value) {
                return this.innerModel.value
            }
            return this.model.value
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
                item: this.value
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
