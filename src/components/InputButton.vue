<template>
    <button
        @click.stop="$emit('click')"
        class="btn btn--square"
        :disabled="disabled">
        <div class="column center">
            <span>{{ name }}</span>
            <span class="gap-top--s small secondary">{{ secondary }}</span>
        </div>
    </button>
</template>

<script>
export default {
    name: 'InputButton',
    props: {
        name: String,
        secondary: String,
        disabled: {
            type: Boolean,
            default: false
        }
    }
}
</script>

<style></style>
