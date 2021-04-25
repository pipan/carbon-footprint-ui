<template>
    <header-layout
        :title="draft.name"
        secondary="Description"
        :back-url="{ name: 'footprint.write' }"
        action="PREVIEW"
        @action="preview()">
        <div class="gap--m column flex">
            <textarea class="input flex" v-model="internalValue" v-app-autofocus="true"></textarea>
        </div>
    </header-layout>
</template>

<script>
import HeaderLayout from "./layouts/HeaderLayout.vue";
export default {
    name: "DescriptionUpdate",
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
            this.$services.history.replace({
                name: 'footprint.write.description.preview'
            })
        }
    },
    created: function () {
        this.$services.draft.load(this.id)
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
