<template>
    <header-layout
        :title="draft.name"
        secondary="Description"
        :back-url="{ name: 'footprint.write.description' }"
        action="EDIT"
        @action="edit()">
        <div class="gap--m column flex">
            <vue-markdown>{{ draft.description }}</vue-markdown>
        </div>
    </header-layout>
</template>

<script>
import HeaderLayout from "./layouts/HeaderLayout.vue";
import VueMarkdown from 'vue-markdown'
export default {
    name: "DescriptionPreview",
    components: { HeaderLayout, VueMarkdown },
    props: {
        id: [String, Number]
    },
    computed: {
        draft: function () {
            return this.$store.getters['draft/model']
        }
    },
    methods: {
        edit: function () {
            this.$services.history.replace({
                name: 'footprint.write.description'
            })
        }
    },
    created: function () {
        this.$services.draft.load(this.id)
    }
};
</script>

<style></style>
