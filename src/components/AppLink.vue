<template>
    <a :href="$router.resolve(route).href" @click.prevent="navigate()">
        <slot></slot>
    </a>
</template>

<script>
export default {
    name: 'AppLink',
    props: {
        route: [ Object, String ],
        mode: {
            type: String,
            default: 'push'
        }
    },
    methods: {
        navigate: function () {
            if (this.$router.resolve(this.route).href === this.$route.fullPath) {
                return;
            }
            if (this.mode === 'push') {
                this.$services.history.push(this.route)
            } else if (this.mode === 'replace') {
                this.$services.history.replace(this.route)
            }
        }
    }
}
</script>

<style></style>
