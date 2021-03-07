<template>
    <div class="container">
        <header class="elevate">
            <div class="gap--s">
                <button @click="$router.go(-1)" class="btn btn--circle">
                    <span class="material-icons">arrow_back</span>
                </button>
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
export default {
  name: 'HeaderLayout',
  props: ['title', 'titleSecondary', 'action']
}
</script>

<style></style>
