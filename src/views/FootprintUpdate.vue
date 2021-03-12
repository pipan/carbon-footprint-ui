<template>
    <header-layout
        title="Book"
        :back-url="{ name: 'footprint', params: { id } }"
        action="SAVE"
        @action="save()">
        <div>
            <router-link to="name" append class="list-item list-item--interactive column">
                <div>Name</div>
                <div class="secondary gap-top--s">Book</div>
            </router-link>
            <router-link to="type" append class="list-item list-item--interactive column">
                <div>Type</div>
                <div class="secondary gap-top--s">Other</div>
            </router-link>
            <div class="list-item list-item--interactive column">
                <div>Tags</div>
                <div class="secondary gap-top--s">Click to add tags</div>
            </div>
            <div class="list-item list-item--interactive column">
                <div>Description</div>
                <div class="secondary gap-top--s">Click to edit description</div>
            </div>
            <div class="list-item list-item--interactive column">
                <div>Model</div>
                <div class="secondary gap-top--s">Click to edit model</div>
            </div>
        </div>
    </header-layout>
</template>

<script>
import HeaderLayout from "./layouts/HeaderLayout.vue";
export default {
    name: "FootprintUpdate",
    components: { HeaderLayout },
    props: ['id'],
    data: function () {
        return {
            item: {
                id: 1,
                carbon: 0.34,
                title: 'Book',
                description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam id dfgdf gd fgdfgf ...'
            }
        }
    },
    methods: {
        save: function () {
            console.log("SAVE");
        }
    }
};
</script>

<style></style>
