<template>
    <div class="abs abs--top abs--right">
        <context-menu>
            <div>
                <div class="context__item">New{{'\xa0'}}Footprint</div>
                <div class="context__item">Settings</div>
            </div>
        </context-menu>
    </div>
</template>

<script>
import ContextMenu from '../components/ContextMenu.vue';
export default {
    name: 'AppContext',
    components: { ContextMenu }
}
</script>

<style></style>
