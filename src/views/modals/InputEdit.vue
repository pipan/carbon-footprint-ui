<template>
    <app-modal
        modal-title="Input"
        @click-outside="close()">
        <form @submit.prevent="submit()">
            <div class="modal__body">
                <div>
                    <label for="input-name">Name</label>
                    <input id="input-name" class="input" type="text" name="name" autocomplete="off" v-model="internalValue.name" />
                </div>
                <div class="gap-top--m">
                    <label for="input-type" class="flex">Type</label>
                    <div class="row">
                        <select class="flex" v-model="internalValue.unit_id">
                            <option
                                id="input-type"
                                v-for="unit of $store.state.unit.items"
                                :key="unit.id"
                                :value="unit.id">{{ unit.name }}</option>
                        </select>
                    </div>
                </div>
                <div class="gap-top--m">
                    <label for="input-name">Default Value</label>
                    <unit-input
                        :unitId="internalValue.unit_id"
                        :value="internalValue.default_value"
                        @change="internalValue.default_value = $event"></unit-input>
                </div>
            </div>
            <div class="modal__footer">
                <div class="row reverse flex">
                    <button type="submit" class="btn btn--primary">SAVE</button>
                    <div class="gap-right--m">
                        <button type="button" @click="close()" class="btn btn--secondary">CANCEL</button>
                    </div>
                </div>

                <div class="gap-right--m" v-if="canRemove">
                    <button type="button" @click="remove()" class="btn btn--danger">REMOVE</button>
                </div>
            </div>
        </form>
    </app-modal>
</template>

<script>
import AppModal from "../../components/AppModal.vue";
import UnitInput from '../../components/UnitInput.vue';
export default {
    name: "InputEdit",
    components: { AppModal, UnitInput },
    props: {
        id: [ String, Number ],
        inputId: [ String, Number ]
    },
    data: function () {
        return {
            internalValue: ""
        }
    },
    computed: {
        draft: function () {
            return this.$store.getters['draft/model']
        },
        canRemove: function () {
            return this.draft.inputs[this.inputId] !== undefined
        }
    },
    methods: {
        close: function () {
            this.$services.history.back({
                name: 'footprint.write.model',
                params: {
                    id: this.id
                }
            })
        },
        submit: function () {
            this.$store.commit('draft/setInput', {
                index: this.inputId,
                value: this.internalValue
            })
            this.close()
        },
        remove: function () {
            this.$store.commit('draft/removeInput', this.inputId)
            this.close()
        }
    },
    created: function () {
        if (!this.draft.inputs[this.inputId]) {
            this.internalValue = {
                name: 'x',
                unit_id: 1,
                default_value: 1000
            }
            return
        }
        this.internalValue = Object.assign({}, this.draft.inputs[this.inputId])
    }
};
</script>

<style></style>
