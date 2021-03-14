<template>
    <div>
        <div class="gap-v--l">
            <search-list-item
                v-for="(item, index) in $store.state.search.items"
                :key="item.id"
                :item="item"
                :verified="item.verified"
                @select="$router.push({path: '/footprint/' + $event})"
                :class="{'gap-top--l': index > 0}"
                ></search-list-item>
        </div>
    </div>
</template>

<script>
import SearchListItem from '../components/SearchListItem.vue';
export default {
    name: "Search",
    props: ['query'],
    components: { SearchListItem },
    watch: {
        query: function (newValue) {
            this.search(newValue)
        }
    },
    mounted: function () {
        this.search(this.query)
    },
    methods: {
        search: function (query) {
            this.$store.dispatch('search/load', {
                query: query
            })
        }
    }
};
</script>

<style></style>
