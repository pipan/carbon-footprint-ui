<template>
    <div @click="back()" aria="button">
        <slot></slot>
    </div>
</template>

<script>
export default {
    name: 'BackButton',
    props: ['backUrl'],
    methods: {
        back: function () {
            this.$root.$data.stores.history.back(this.backUrl)
        }
    }
}
</script>

<style></style>
