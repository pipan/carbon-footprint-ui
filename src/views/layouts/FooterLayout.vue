<template>
    <div class="column">
        <div class="flex">
            <slot></slot>
        </div>
        <footer>
            <app-link class="btn btn--secondary" :route="{ name: 'article', params: { slug: 'about' } }">ABOUT</app-link>
        </footer>
    </div>
</template>

<script>
export default {
  components: { },
  name: 'FooterLayout'
}
</script>

<style></style>
