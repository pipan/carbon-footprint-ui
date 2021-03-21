<template>
    <div class="row">
        <button
            v-for="option of options"
            :key="option.value"
            @click="select(option.value)"
            class="btn btn--circle"
            :class="{ 'btn--primary': option.value === value }">
            <span class="material-icons">{{ option.icon }}</span>
        </button>
    </div>
</template>

<script>
export default {
    name: 'InputSwichIcon',
    props: {
        value: [ Object, Number, String ],
        options: Array
    },
    methods: {
        select: function (value) {
            if (value === this.value) {
                return
            }
            this.$emit('change', value)
        }
    }
}
</script>

<style></style>
