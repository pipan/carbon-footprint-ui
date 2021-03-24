<template>
    <div v-if="!loading" class="column flex--grow">
        <transition name="animation--fade" mode="out-in">
            <router-view class="column flex--grow" :class="{'animation--blur': isModalOpen, 'animate--all': isModalOpen, 'animate--fast': !isModalOpen}" />
        </transition>
        <transition name="animation--fade">
            <router-view name="modal" ref="modal"/>
        </transition>
    </div>
</template>

<script>
export default {
    computed: {
        isModalOpen: function () {
            if (this.$route.matched.length <= 0) {
                return false
            }
            return this.$route.matched[0].components.modal !== undefined
        },
        loading: function () {
            return this.$store.state.unit.loading
        }
    },
    created: function () {
        this.$store.dispatch('unit/load');
    }
}
</script>

<style>
@import "./assets/css/grid.css";
@import "./assets/css/gap.css";
@import "./assets/css/typography.css";
@import "./assets/css/button.css";
@import "./assets/css/input.css";
@import "./assets/css/list.css";
@import "./assets/css/tag.css";

@import "./assets/css/modal.css";
@import "./assets/css/context.css";
@import "./assets/css/layout.css";
@import "./assets/css/animation.css";
@import "./assets/css/root.css";
</style>
