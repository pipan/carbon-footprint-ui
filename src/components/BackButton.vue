<template>
    <div @click="back()" aria="button">
        <slot></slot>
    </div>
</template>

<script>
export default {
    name: 'BackButton',
    props: {
        backUrl: [Object, String]
    },
    methods: {
        back: function () {
            this.$services.history.back(this.backUrl)
        }
    }
}
</script>

<style></style>
