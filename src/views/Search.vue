<template>
    <div>
        <div v-if="isServerError">
            <div class="column center" style="position:relative; top: 160px">
                <img src="/image/500.svg" />
                <div class="thin gap-top--l">Something went wrong</div>
            </div>
        </div>
        <div v-if="isOk">
            <div class="secondary thin gap-h--l gap-top--m">
                results: {{ pagination.total }}
            </div>
            <div class="gap-v--m">
                <search-list-item
                    v-for="(item, index) in items"
                    :key="item.id"
                    :item="item"
                    :verified="item.verified"
                    @select="openFootprint($event)"
                    :class="{'gap-top--l': index > 0}"
                    ></search-list-item>
                <app-pagination
                    class="gap-v--m"
                    :page="pagination.page"
                    :limit="pagination.limit"
                    :total="pagination.total"
                    @select="selectPage($event)"/>
            </div>
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
    computed: {
        items: function () {
            return this.$store.state.search.items
        },
        pagination: function () {
            return this.$store.state.search.pagination
        },
        error: function () {
            return this.$store.state.search.error
        },
        isOk: function() {
            return this.error === false
        },
        isServerError: function () {
            return !this.isOk && this.error.status >= 500
        }
    },
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
