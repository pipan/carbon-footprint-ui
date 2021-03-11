<template>
    <div class="container">
        <app-context></app-context>
        <div class="gap-v--l gap-h--m">
            <app-logo/>
        </div>
        <search-input
            class="gap-h--m"
            :query="query"
            @search="search($event)"></search-input>
        <transition name="animation--fade" mode="out-in">
            <router-view class="animate--fast" />
        </transition>
    </div>
</template>

<script>
import AppContext from '../../components/AppContext.vue';
import AppLogo from '../../components/AppLogo.vue';
import SearchInput from "../../components/SearchInput.vue";
export default {
  name: "SearchLayout",
  components: { SearchInput, AppContext, AppLogo },
  props: ['query'],
  methods: {
    search: function (searchString) {
      this.$router.push({
        path: "search",
        query: {
          q: searchString,
        },
      });
    },
  },
};
</script>

<style></style>
