<template>
    <div @click="$emit('select', 1)" class="list-item list-item--interactive row center">
        <div class="list-item__carbon">
            <carbon-result
                :carbon="carbon"></carbon-result>
        </div>
        <div class="column gap-left--s">
            <div class="row middle">
                <span v-if="verified" class="material-icons primary md-18 gap-right--s">check_circle_outline</span>
                <h3 class="ellipsis list-item__title">{{ title }}</h3>
            </div>
            <p class="no-gap-before secondary compact">{{ description }}</p>
        </div>
    </div>
</template>

<script>
import CarbonResult from './CarbonResult.vue'
export default {
    name: 'SearchListItem',
    components: { CarbonResult },
    props: ['carbon', 'title', 'description', 'verified'],
    computed: {
        unit: function () {
            return 'g'
        }
    }
}
</script>

<style></style>
