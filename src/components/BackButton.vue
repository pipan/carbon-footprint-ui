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
            if (window.history.length > this.$root.$data.historyOriginIndex) {
                this.$router.go(-1);
                return;
            }
            
            if (this.backUrl) {
                this.$router.replace(this.backUrl);
                return;
            }

            this.$emit('back');
        }
    }
}
</script>

<style></style>
