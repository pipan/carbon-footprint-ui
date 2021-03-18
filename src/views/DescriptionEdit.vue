<template>
    <header-layout
        :title="draft.name"
        secondary="Description"
        :back-url="{ name: 'footprint.write', params: { id } }"
        action="PREVIEW"
        @action="preview()">
        <div class="gap--m column flex">
            <textarea class="input flex" v-model="internalValue"></textarea>
        </div>
    </header-layout>
</template>

<script>
import HeaderLayout from "./layouts/HeaderLayout.vue";
export default {
    name: "FootprintUpdate",
    components: { HeaderLayout },
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
        }
    },
    methods: {
        preview: function () {
            console.log("PREVIEW");
        }
    },
    created: function () {
        this.internalValue = this.draft.description
    },
    beforeDestroy: function () {
        if (this.internalValue == this.draft.description) {
            return
        }
        this.$store.commit('draft/setDescription', this.internalValue)
    }
};
</script>

<style></style>
