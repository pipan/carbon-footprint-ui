<template>
    <header-layout
        :title="draft.name"
        secondary="Model"
        :back-url="{ name: 'footprint.write', params: { id } }">
        <div class="column flex">
            <div class="gap-top--m">
                <div class="detail__inputs">
                    <div class="row middle flex">
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
                <textarea class="input flex" v-model="internalValue"></textarea>
            </div>
            <div class="row center middle gap--m">Output: unknown</div>
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
            internalValue: ""
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
    },
    beforeDestroy: function () {
        // if (this.internalValue == this.draft.description) {
        //     return
        // }
        // this.$store.commit('draft/setDescription', this.internalValue)
    }
};
</script>

<style></style>
