<template>
    <div tabindex="0"
        :aria-checked="value"
        role="switch"
        class="switch"
        :class="{ 'switch--on': value }"
        @click.stop="toggle()"
        @keypress.enter="toggle()"
        @keypress.space="toggle()"></div>
</template>

<script>
export default {
    name: 'InputSwichEntity',
    props: {
        value: [ Boolean ]
    },
    methods: {
        toggle: function () {
            this.$emit('change', !this.value)
        }
    }
}
</script>

<style></style>
