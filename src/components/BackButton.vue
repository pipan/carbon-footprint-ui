<template>
    <div @click="back()" aria="button" class="round round--full">
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
