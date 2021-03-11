<template>
    <div class="modal" @click.stop="$emit('click-outside')">
        <div class="modal__canvas" @click.stop>
            <div class="modal__header">
                <h3>{{ modalTitle }}</h3>
            </div>
            <slot></slot>
        </div>
    </div>
</template>

<script>
export default {
    name: "AppModal",
    props: ['modalTitle']
};
</script>

<style></style>
