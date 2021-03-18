<template>
    <div class="abs abs--top abs--right">
        <context-menu ref="context">
            <div>
                <app-link :route="{ name: 'footprint.write', params: { id } }" class="context__item">Edit</app-link>
            </div>
        </context-menu>
    </div>
</template>

<script>
import ContextMenu from '../components/ContextMenu.vue';
export default {
    name: 'FootprintContext',
    props: {
        id: [String, Number]
    },
    components: { ContextMenu },
    methods: {
        close: function () {
            this.$refs.context.close();
        }
    }
}
</script>

<style></style>
