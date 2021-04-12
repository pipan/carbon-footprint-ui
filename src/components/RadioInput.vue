<template>
    <div class="radio-row__option"
        role="radio"
        tabindex="0"
        :aria-checked="selected"
        :class="{ 'radio__option--selected': selected }"
        @click="select()"
        @keydown.enter="select()"
        @keydown.space="select()">
        <slot></slot>
    </div>
</template>

<script>
export default {
    name: 'RadioInput',
    props: {
        value: [ String, Object ],
        selected: Boolean
    },
    methods: {
        select: function () {
            if (this.selected) {
                return
            }
            this.$emit('select', this.value)
        }
    }
}
</script>

<style></style>
