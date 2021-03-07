<template>
    <div class="modal" @click.stop="close()">
        <div class="modal__canvas" @click.stop>
            <div class="modal__header">
                <h3>{{ title }}</h3>
            </div>
            <slot></slot>
        </div>
    </div>
</template>

<script>
export default {
    name: "Modal",
    props: ['title'],
    methods: {
        close: function () {
            this.$router.go(-1);
        },
    }
};
</script>

<style></style>
