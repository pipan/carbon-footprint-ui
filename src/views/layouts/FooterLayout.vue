<template>
    <div class="column flex">
        <div class="flex">
            <slot></slot>
        </div>
        <footer class="small">
            <app-link class="btn btn--secondary" :route="{ name: 'article', params: { slug: 'about' } }">about</app-link>
            <app-link class="btn btn--secondary" :route="{ name: 'article', params: { slug: 'help' } }">help</app-link>
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
