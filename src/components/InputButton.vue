<template>
    <button
        @click="$emit('click')"
        class="btn">
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
        secondary: String
    }
}
</script>

<style></style>
