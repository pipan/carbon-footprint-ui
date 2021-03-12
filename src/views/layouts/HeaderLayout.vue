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
            <h3 class="gap-right--m ellipsis">{{ title }}</h3>
            <div v-if="action" class="gap-h--s">
                <button @click="$emit('action')" class="btn btn--primary">
                    {{ action }}
                </button>
            </div>
        </header>
        <div class="container container--header-pad">  
            <slot></slot>
        </div>
    </div>
</template>

<script>
import BackButton from '../../components/BackButton.vue'
export default {
  components: { BackButton },
  name: 'HeaderLayout',
  props: ['title', 'titleSecondary', 'action', 'backUrl']
}
</script>

<style></style>
