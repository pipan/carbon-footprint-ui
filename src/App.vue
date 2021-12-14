<template>
    <div v-if="!loading" class="column flex--grow">
        <transition name="animation--fade" mode="out-in">
            <router-view class="column flex--grow" :class="{'animation--blur': isModalOpen, 'animate--all': isModalOpen, 'animate--fast': !isModalOpen}" />
        </transition>
        <transition name="animation--fade">
            <router-view name="modal" ref="modal"/>
        </transition>
        <transition name="animation--fade">
            <app-modal v-if="isUpdating" modalTitle="Updating application">
                <div class="gap-h--m">
                    <div class="gap-v--l">
                        <div class="progress progress--infinite"></div>
                    </div>
                </div>
            </app-modal>
        </transition>
    </div>
</template>

<script>
import AppModal from './components/AppModal.vue'

export default {
    components: { AppModal },
    data: function () {
        return {
            refreshing: false
        }
    },
    computed: {
        isModalOpen: function () {
            if (this.$route.matched.length <= 0) {
                return false
            }
            return this.$route.matched[0].components.modal !== undefined
        },
        loading: function () {
            return this.$store.state.unit.loading
        },
        isUpdating: function () {
            return this.$store.state.app.updating
        }
    },
    created: function () {
         document.addEventListener('swUpdateFound', () => {
            this.$store.dispatch('app/updateStart')
        }, { once: true })
        document.addEventListener('swUpdated', (event) => {
            const registration = event.detail
            if (!registration.waiting) {
                return
            }
            registration.waiting.postMessage({ type: 'SKIP_WAITING' })
        }, { once: true })
        if (navigator.serviceWorker) {
            navigator.serviceWorker.addEventListener('controllerchange', () => {
                if (this.refreshing) {
                    return
                }
                this.refreshing = true
                window.location.reload()
            })
        }

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
@import "./assets/css/progress.css";

@import "./assets/css/modal.css";
@import "./assets/css/context.css";
@import "./assets/css/layout.css";
@import "./assets/css/animation.css";
@import "./assets/css/root.css";
</style>
