<template>
    <header-layout
        :title="draft.name"
        :back-url="{ name: 'index' }"
        action="SAVE"
        @action="save()">
        <div>
            <app-link :route="{ name: 'footprint.write.name', params: { id } }" class="list-item list-item--interactive link--inherit column">
                <div>Name</div>
                <div class="secondary gap-top--s">{{ draft.name }}</div>
            </app-link>
            <!-- <app-link :route="{ name: 'footprint.write.type', params: { id } }" class="list-item list-item--interactive link--inherit column">
                <div>Type</div>
                <div class="secondary gap-top--s">{{ draft.type.name }}</div>
            </app-link> -->
            <app-link :route="{ name: 'footprint.write.description', params: { id } }" class="list-item list-item--interactive link--inherit column">
                <div>Description</div>
                <div class="secondary gap-top--s">Click to edit description</div>
            </app-link>
            <app-link :route="{ name: 'footprint.write.model', params: { id } }" class="list-item list-item--interactive link--inherit column">
                <div>Model</div>
                <div class="secondary gap-top--s">Click to edit model</div>
            </app-link>
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
    computed: {
        draft: function () {
            return this.$store.getters['draft/model']
        }
    },
    methods: {
        save: function () {
            this.$services.draft.save(this.id)
                .then((result) => {
                    this.$services.history.replace({
                        name: 'footprint',
                        params: {
                            id: result.id
                        }
                    })
                })
        }
    },
    created: function() {
        this.$services.draft.load(this.id)
    }
};
</script>

<style></style>
