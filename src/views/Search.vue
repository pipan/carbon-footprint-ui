<template>
    <div>
        <div class="gap-v--l">
            <search-list-item
                v-for="(item, index) in items"
                :key="item.id"
                :carbon="item.carbon"
                :title="item.title"
                :description="item.description"
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
    data: function () {
        return {
            items: [
                {
                    id: 1,
                    carbon: 0.34,
                    title: 'Book',
                    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam id dfgdf gd fgdfgf ...'
                }, {
                    id: 2,
                    carbon: 1.2,
                    title: 'Book - too long to fit in one line',
                    description: 'Lorem ipsum.'
                }, {
                    id: 3,
                    carbon: 0.49,
                    title: 'Book - Ikar',
                    description: 'Lorem ipsum.',
                    verified: true
                }
            ]
        }
    },
    components: { SearchListItem }
};
</script>

<style></style>
