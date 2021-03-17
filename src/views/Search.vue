<template>
    <div>
        <div class="secondary thin gap-h--l gap-top--m">
            results: {{ $store.state.search.pagination.total }}
        </div>
        <div class="gap-v--m">
            <search-list-item
                v-for="(item, index) in $store.state.search.items"
                :key="item.id"
                :item="item"
                :verified="item.verified"
                @select="openFootprint($event)"
                :class="{'gap-top--l': index > 0}"
                ></search-list-item>
            <app-pagination
                class="gap-v--m"
                :page="$store.state.search.pagination.page"
                :limit="$store.state.search.pagination.limit"
                :total="$store.state.search.pagination.total" />
        </div>
    </div>
</template>

<script>
import AppPagination from '../components/AppPagination.vue';
import SearchListItem from '../components/SearchListItem.vue';
export default {
    name: "Search",
    props: ['query'],
    components: { SearchListItem, AppPagination },
    watch: {
        query: function (newValue) {
            this.search(newValue)
            this.$services.title.set("search for \"" + newValue + "\" | Carbon Footprint")
        }
    },
    mounted: function () {
        this.search(this.query)
        this.$services.title.set("search for \"" + this.query + "\" | Carbon Footprint")
    },
    methods: {
        search: function (query) {
            this.$store.dispatch('search/load', {
                query: query
            })
        },
        openFootprint: function (id) {
            this.$services.history.push({
                name: 'footprint',
                params: {
                    id: id
                }
            })
        }
    }
};
</script>

<style></style>
