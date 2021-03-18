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
            <div class="list-item list-item--interactive column">
                <div>Model</div>
                <div class="secondary gap-top--s">Click to edit model</div>
            </div>
        </div>
    </header-layout>
</template>

<script>
import HeaderLayout from "./layouts/HeaderLayout.vue";
import CreateBehavior from "./behaviors/CreateBehavior";
import UpdateBehavior from "./behaviors/UpdateBehavior";
export default {
    name: "FootprintUpdate",
    components: { HeaderLayout },
    props: {
        id: [String, Number]
    },
    data: function () {
        return {
            behaviors: {
                new: new CreateBehavior(this.$store),
                default: new UpdateBehavior(this.$store)
            }
        }
    },
    computed: {
        draft: function () {
            return this.$store.getters['draft/model']
        }
    },
    methods: {
        getBehavior(id) {
            if (this.behaviors[id]) {
                return this.behaviors[id]
            }
            return this.behaviors.default
        },
        save: function () {
            this.getBehavior(this.id).save(this.id)
        }
    },
    created: function() {
        this.getBehavior(this.id).load(this.id)
    }
};
</script>

<style></style>
