<template>
    <div class="abs abs--top abs--right">
        <context-menu ref="context">
            <div>
                <router-link :to="{path: 'create'}" class="context__item" @click.native="close()">New{{'\xa0'}}Footprint</router-link>
                <div class="context__item">Settings</div>
            </div>
        </context-menu>
    </div>
</template>

<script>
import ContextMenu from '../components/ContextMenu.vue';
export default {
    name: 'AppContext',
    components: { ContextMenu },
    methods: {
        close: function () {
            this.$refs.context.close();
        }
    }
}
</script>

<style></style>
