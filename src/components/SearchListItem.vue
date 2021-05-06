<template>
    <div @click="$emit('select', item.id)" class="list-item list-item--interactive row">
        <div class="list-item__carbon">
            <carbon-result :carbon="item.eval"/>
        </div>
        <div class="column gap-left--s">
            <div class="row middle">
                <span v-if="verified" class="material-icons primary md-18 gap-right--s">check_circle_outline</span>
                <h3 class="list-item__title">{{ item.name | ellipsis(47) }}</h3>
            </div>
            <p class="no-gap-after secondary compact">{{ item.description | markdownParagraph | ellipsis }}</p>
            <div class="row gap-grid--s gap-top--s">
                <span v-for="input of item.inputs"
                    :key="input.id"
                    :title="input.name"
                    class="tag tag--secondary">{{ input.default_value | unitHuman(input.unit.id) }}</span>
            </div>
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
