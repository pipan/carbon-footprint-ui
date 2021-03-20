<template>
    <header-layout
        :title="draft.name"
        secondary="Model"
        :back-url="{ name: 'footprint.write', params: { id } }">
        <div class="column flex">
            <div class="gap-top--m">
                <div class="detail__inputs row middle">
                    <div class="row middle flex wrap">
                        <span class="secondary" v-if="!hasInputs">no input</span>
                        <input-button
                            v-for="(input, index) of draft.inputs"
                            :key="index"
                            :name="input.name"
                            :secondary="$store.getters['unit/map'][input.unit_id].name"
                            @click="openInput(index)" />
                    </div>
                    <div class="gap-left--s gap-v--s">
                        <button @click="openInput('new')" class="btn btn--secondary btn--circle">
                            <span class="material-icons">add</span>
                        </button>
                    </div>
                </div>
            </div>
            <div class="column gap-top--m gap-h--m flex">
                <textarea class="input flex" v-model="internalComponents"></textarea>
            </div>
            <div class="row center middle gap--m">
                <label class="label--inline" for="output_unit_id">Output</label>
                <select id="output_unit_id" v-model="internalOutput">
                    <option
                        v-for="unit of $store.state.unit.items"
                        :key="unit.id"
                        :value="unit.id">{{ unit.name }}</option>
                </select>
            </div>
        </div>
        
    </header-layout>
</template>

<script>
import InputButton from '../components/InputButton.vue';
import HeaderLayout from "./layouts/HeaderLayout.vue";
export default {
    name: "ModelEdit",
    components: { HeaderLayout, InputButton },
    props: {
        id: [String, Number]
    },
    data: function () {
        return {
            internalComponents: "",
            internalOutput: 1
        }
    },
    computed: {
        draft: function () {
            return this.$store.getters['draft/model']
        },
        hasInputs: function () {
            return this.draft.inputs && this.draft.inputs.length > 0
        }
    },
    methods: {
        openInput: function (inputIndex) {
            this.$services.history.push({
                name: 'footprint.write.input',
                params: {
                    id: this.id,
                    inputId: inputIndex
                }
            })
        }
    },
    created: function () {
        this.$services.draft.load(this.id)
        this.internalComponents = JSON.stringify(this.draft.components)
        this.internalOutput = this.draft.output_unit_id
    },
    beforeDestroy: function () {
        if (this.internalComponents != JSON.stringify(this.draft.components)) {
            this.$store.commit('draft/setComponents', JSON.parse(this.internalComponents))
        }
        if (this.internalOutput != this.draft.output_unit_id) {
            this.$store.commit('draft/setOutput', this.internalOutput)
        }
    }
};
</script>

<style></style>
