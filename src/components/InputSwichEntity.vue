<template>
    <div class="row">
        <button
            v-for="option of options"
            :key="option.value"
            @click="select(option.value)"
            type="button"
            class="btn btn--circle"
            :class="{ 'btn--primary': option.value == value }">
                <span class="entity-icon entity-icon--l" v-html="option.entity"></span>
            </button>
    </div>
</template>

<script>
export default {
    name: 'InputSwichEntity',
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
