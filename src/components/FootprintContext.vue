<template>
    <div class="abs abs--top abs--right">
        <context-menu ref="context">
            <div>
                <router-link to="/footprint/1/update" append class="context__item">Edit</router-link>
            </div>
        </context-menu>
    </div>
</template>

<script>
import ContextMenu from '../components/ContextMenu.vue';
export default {
    name: 'FootprintContext',
    components: { ContextMenu },
    methods: {
        close: function () {
            this.$refs.context.close();
        }
    }
}
</script>

<style></style>
