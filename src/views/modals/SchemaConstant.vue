<template>
    <app-modal
        modal-title="Constant"
        @click-outside="close()">
        <form @submit.prevent="submit()">
            <div class="modal__body">
                <schema-operation-input v-if="hasOperation"
                    :value="operation"
                    @change="internalOperation = $event"
                    class="gap-bottom--m row center"/>
                <div class="row">
                    <select class="flex"
                        :value="item.unit"
                        @change="setUnit($event.target.value)">
                        <option
                            id="input-type"
                            v-for="unit of units"
                            :key="unit.id"
                            :value="unit.id">{{ unit.name }}</option>
                    </select>
                </div>
                <div class="gap-top--m">
                    <unit-input :unitId="item.unit"
                        :value="item.value"
                        :autofocus="true"
                        @change="setValue($event)"></unit-input>
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
import UnitInput from '../../components/UnitInput.vue';
export default {
    name: "SchemaConstant",
    components: { AppModal, UnitInput, SchemaOperationInput },
    props: {
        model: Object,
        enableRemove: {
            type: Boolean,
            default: false
        }
    },
    data: function () {
        return {
            internal: {},
            default: {
                value: '',
                unit: 8
            },
            internalOperation: ''
        }
    },
    computed: {
        operation: function () {
            if (this.internalOperation) {
                return this.internalOperation
            }
            if (this.model.operation) {
                return this.model.operation
            }
            return '+'
        },
        item: function () {
            return Object.assign({}, this.default, this.model.item, this.internal)
        },
        units: function () {
            return this.$store.state.unit.items
        },
        hasOperation: function () {
            return this.model.operation
        }
    },
    methods: {
        setUnit: function (unit) {
            this.internal = Object.assign({}, this.internal, {
                unit: unit
            })
        },
        setValue: function (value) {
            this.internal = Object.assign({}, this.internal, {
                value: value
            })
        },
        close: function () {
            this.$emit('close')
        },
        submit: function () {
            let payload = {
                item: {
                    type: 'constant',
                    value: this.item.value,
                    unit: this.item.unit
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
