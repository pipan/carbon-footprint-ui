<template>
    <div v-if="isVisible" class="row center">
        <button
            class="btn"
            :class="{'btn--primary': p === page}"
            v-for="p in pages"
            :key="p"
            @click="$emit('select', p)">
            {{ p }}
        </button>
    </div>
</template>

<script>
export default {
    name: 'AppPagination',
    props: ['page', 'limit', 'total'],
    methods: {
        normalize: function(page) {
            return Math.min(Math.max(page, 1), this.maxPage);
        }
    },
    computed: {
        maxPage: function () {
            return Math.ceil(this.total / this.limit);
        },
        normPage: function () {
            return Math.min(Math.max(this.page, 0), this.maxPage);
        },
        isVisible: function () {
            return this.pages.length > 0
        },
        pages: function () {
            let range = [this.normPage - 2, this.normPage + 2];
            let overflow = [Math.max(0, 1 - range[0]), Math.max(0, range[1] - this.maxPage)]
            range[0] = this.normalize(range[0] - overflow[1])
            range[1] = this.normalize(range[1] + overflow[0])

            if (range[0] === range[1]) {
                return [];
            }

            let result = [];
            for (let i = range[0]; i <= range[1]; i++) {
                result.push(i);
            }
            return result;
        }
    }
}
</script>

<style></style>
