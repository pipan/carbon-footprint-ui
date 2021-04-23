<template>
    <header-layout
        :title="header.title"
        :secondary="header.secondary"
        :back-url="header.backUrl">
        <div class="column flex">
            <div class="gap-v--m">
                <div class="detail__inputs row middle">
                    <div class="row middle flex wrap gap-grid--s">
                        <span class="secondary gap-left--s small" v-if="!hasInputs">no input</span>
                        <input-button
                            v-for="input of inputs"
                            :key="input.reference"
                            :name="input.name"
                            :secondary="$store.getters['unit/map'][input.unit_id].name"
                            @click="openInput(input.reference)" />
                    </div>
                    <div class="gap-left--s gap-v--s">
                        <button @click="openInput('new')" class="btn btn--secondary btn--circle">
                            <span class="material-icons">add</span>
                        </button>
                    </div>
                </div>
            </div>
            <slot></slot>
        </div>
    </header-layout>
</template>

<script>
import InputButton from '../../components/InputButton.vue';
import HeaderLayout from "./HeaderLayout.vue";
export default {
    name: "ModelEditLayout",
    components: { HeaderLayout, InputButton },
    props: {
        id: [ String, Number ],
        inputs: {
            type: Array,
            default: () => []
        },
        header: Object
    },
    computed: {
        hasInputs: function () {
            return this.inputs.length > 0
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
    }
};
</script>

<style></style>
