<template>
    <div class="abs abs--top abs--right">
        <context-menu ref="context">
            <div>
                <button class="btn context__item" @click="navigate({path: 'create'})">New{{'\xa0'}}Footprint</button>
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
        },
        navigate: function (route) {
            this.$services.history.push(route)
        }
    }
}
</script>

<style></style>
