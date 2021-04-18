<template>
    <form class="search gap-h--m" @submit.prevent="submit(queryValue)">
        <input v-model="queryValue" 
            ref="input"
            type="text"
            name="search"
            class="search__input"
            placeholder="search"
            autocomplete="off" />
        <button type="submit" class="search__btn">
            <span class="material-icons">search</span>
        </button>
    </form>
</template>

<script>
export default {
    name: 'SearchInput',
    props: ['query'],
    data: function() {
        return {
            queryValue: this.query
        }
    },
    watch: {
        query: function (newValue, oldValue) {
            if (newValue === oldValue) {
                return;
            }
            this.queryValue = newValue;
        }
    },
    methods: {
        submit: function (searchString) {
            if (!searchString) {
                return false;
            }
            if (searchString === this.query) {
                return false;
            }
            this.$emit('search', searchString);
            this.$refs.input.blur()
        }
    }
}
</script>

<style></style>
