<template>
    <div @click="$emit('select', item.id)" class="list-item list-item--interactive row">
        <div class="list-item__carbon">
            <carbon-result :carbon="item.carbon"/>
        </div>
        <div class="column gap-left--s">
            <div class="row middle">
                <span v-if="verified" class="material-icons primary md-18 gap-right--s">check_circle_outline</span>
                <h3 class="ellipsis list-item__title">{{ item.name }}</h3>
            </div>
            <p class="no-gap-before secondary compact">{{ item.description | ellipsis }}</p>
        </div>
    </div>
</template>

<script>
import CarbonResult from './CarbonResult.vue'
export default {
    name: 'SearchListItem',
    components: { CarbonResult },
    props: ['item', 'verified']
}
</script>

<style></style>
