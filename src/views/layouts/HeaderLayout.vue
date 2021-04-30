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
                <div class="small secondary gap-top--s" v-if="secondary" v-html="secondary"></div>
            </div>
            <div v-if="action" class="gap-right--s">
                <button @click="$emit('action')" :class="actionConfig.button">
                    <span :class="actionConfig.span">{{ actionContent }}</span>
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
      actionIcon: String,
      backUrl: [Object, String]
  },
  data: function () {
      return {
          actions: {
              text: {
                  button: ['btn', 'btn--primary'],
                  span: []
              },
              icon: {
                  button: ['btn', 'btn--circle'],
                  span: ['material-icons']
              }
          }
      }
  },
  computed: {
      actionType: function () {
          if (this.actionIcon) {
              return "icon"
          }
          return "text"
      },
      actionContent: function () {
          if (this.actionType === 'icon') {
              return this.actionIcon
          }
          return this.action
      },
      actionConfig: function () {
          return this.actions[this.actionType]
      }
  },
  watch: {
      title: function (newValue, oldValue) {
          if (newValue === oldValue) {
              return
          }
          this.$services.title.set(newValue + " | Carbon Footprint")
      }
  },
  created: function () {
      this.$services.title.set(this.title + " | Carbon Footprint")
  }
}
</script>

<style></style>
