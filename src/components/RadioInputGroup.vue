<template>
    <div class="column" role="radiogroup">
        <radio-input 
            v-for="item of options"
            :key="item.id"
            :value="item"
            :selected="isSelected(item.id)"
            @select="select($event)">{{ item.name }}</radio-input>
    </div>
</template>

<script>
import RadioInput from './RadioInput.vue'
export default {
    components: { RadioInput },
    name: 'RadioInputGroup',
    props: {
        value: {
            type: [ Object, Number, String, Boolean ],
            default: null
        },
        options: {
            type: [ Array ],
            default: () => []
        }
    },
    methods: {
        isSelected: function (id) {
            if (this.value === null) {
                return false
            }
            if (this.value.id) {
                return this.value.id === id
            }
            return this.value === id
        },
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
