<template>
    <div class="container">
        <app-context></app-context>
        <div class="gap-v--l gap-h--m">
            <logo></logo>
        </div>
        <search-input
        class="gap-h--m"
        :query="searchString"
        @search="search($event)"
        ></search-input>
        <div class="gap-h--m gap-top--l">No result {{ searchString }}</div>
    </div>
</template>

<script>
import SearchInput from "../components/SearchInput.vue";
import AppContext from "../components/AppContext.vue";
import Logo from '../components/Logo.vue';
export default {
  name: "Search",
  components: { SearchInput, AppContext, Logo },
  methods: {
    search: function (searchString) {
      this.$router.push({
        path: "search",
        query: {
          s: searchString,
        },
      });
    },
  },
  computed: {
    searchString: function () {
      return this.$route.query.s;
    },
  },
};
</script>

<style></style>
