<template>
    <div>
        <header class="elevate">
            <div class="gap--s">
                <back-button :back-url="backUrl">
                    <button class="btn btn--circle">
                        <span class="material-icons">arrow_back</span>
                    </button>
                </back-button>
            </div>
            <div class="column flex">
                <h3 class="gap-right--s ellipsis">{{ title }}</h3>
                <div class="small secondary" v-if="secondary">{{ secondary }}</div>
            </div>
            <div v-if="action" class="gap-right--s">
                <button @click="$emit('action')" class="btn btn--primary">
                    {{ action }}
                </button>
            </div>
        </header>
        <div class="container container--header-pad column flex--grow">  
            <slot></slot>
        </div>
    </div>
</template>

<script>
import BackButton from '../../components/BackButton.vue'
export default {
  components: { BackButton },
  name: 'HeaderLayout',
  props: {
      title: String,
      secondary: String,
      action: String,
      backUrl: [Object, String]
  },
  watch: {
      title: function (newValue, oldValue) {
          if (newValue === oldValue) {
              return
          }
          this.$services.title.set(newValue + " | Carbon Footprint")
      }
  },
  mounted: function () {
      this.$services.title.set(this.title + " | Carbon Footprint")
  }
}
</script>

<style></style>
