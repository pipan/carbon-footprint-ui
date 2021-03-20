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
                :total="$store.state.search.pagination.total"
                @select="selectPage($event)"/>
        </div>
    </div>
</template>

<script>
import AppPagination from '../components/AppPagination.vue';
import SearchListItem from '../components/SearchListItem.vue';
export default {
    name: "Search",
    props: {
        query: String,
        page: {
            type: Number,
            default: 1
        }
    },
    components: { SearchListItem, AppPagination },
    watch: {
        query: function (newValue) {
            this.load(newValue, this.page)
        },
        page: function (newValue) {
            this.load(this.query, newValue)
        }
    },
    created: function () {
        this.load(this.query, this.page)
    },
    methods: {
        load: function (query, page) {
            this.$services.title.set("search for \"" + query + "\" in page " + page + " | Carbon Footprint")
            this.$store.dispatch('search/load', {
                query: query,
                page: page
            })
        },
        selectPage: function (page) {
            this.$services.history.push({
                name: 'search',
                query: {
                    q: this.query,
                    p: page
                }
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
