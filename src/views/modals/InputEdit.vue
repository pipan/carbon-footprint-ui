<template>
    <div>
        <app-modal v-if="error"
            :modal-title="error"
            @click-outside="close()">
            <div>
                <div class="modal__body">
                    Input does not exists
                </div>
                <div class="modal__footer">
                    <div class="row reverse flex">
                        <button type="button" @click="close()" class="btn btn--secondary">CLOSE</button>
                    </div>
                </div>
            </div>
        </app-modal>
        <app-modal
            v-if="!error"
            modal-title="Input"
            @click-outside="close()">
            <form @submit.prevent="submit()">
                <div class="modal__body">
                    <div>
                        <label for="input-name">Name</label>
                        <input id="input-name"
                            class="input"
                            type="text"
                            name="name"
                            autocomplete="off"
                            :value="value.name"
                            @input="set('name', $event.target.value)" />
                    </div>
                    <div class="gap-top--m">
                        <label for="input-type" class="flex">Type</label>
                        <div class="row">
                            <select class="flex"
                                :value="value.unit_id"
                                @change="set('unit_id', $event.target.value)">
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
                            :unitId="value.unit_id"
                            :value="value.default_value"
                            @change="set('default_value', $event)"></unit-input>
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
    </div>
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
            internalValue: {},
            placeholderValue: {
                name: 'x',
                unit_id: 1,
                default_value: 1000
            }
        }
    },
    computed: {
        draft: function () {
            return this.$store.getters['draft/model']
        },
        input: function () {
            return this.$store.getters['draft/input'](this.inputId)
        },
        value: function () {
            return Object.assign({}, this.placeholderValue, this.input, this.internalValue)
        },
        isNew: function () {
            return this.inputId === 'new'
        },
        canRemove: function () {
            return !this.isNew
        },
        error: function () {
            if (this.isNew) {
                return false
            }
            if (this.input) {
                return false
            }
            return '404'
        }
    },
    methods: {
        set: function (key, value) {
            let property = {}
            property[key] = value
            this.internalValue = Object.assign({}, this.internalValue, property)
        },
        close: function () {
            this.$services.history.back({
                name: 'footprint.write.model',
                params: {
                    id: this.id
                }
            })
        },
        submit: function () {
            if (this.isNew) {
                this.$store.dispatch('draft/addInput', {
                    value: this.value
                }).then(() => {
                    this.close()
                })
                return 
            }

            this.$store.dispatch('draft/updateInput', {
                reference: this.inputId,
                value: this.value
            }).then(() => {
                this.close()
            })
        },
        remove: function () {
            this.$store.dispatch('draft/removeInput', this.inputId)
                .then(() => {
                    this.close()
                })
        }
    }
};
</script>

<style></style>
