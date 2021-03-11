<template>
    <app-modal
        title="Cover Transportation"
        @click-outside="close()">
        <div>
            <div class="modal__body">
                <div class="row middle">
                    <carbon-result class="gap-h--l" carbon="0.11"></carbon-result>
                    <div class="column">
                        <div>weight: 60g</div>
                        <div class="gap-top--s">distance: {{ 120000000 | unit("length")}}</div>
                    </div>
                </div>
            </div>
            <div class="modal__footer">
                <router-link to="/footprint/2" class="btn btn--primary">OPEN</router-link>
                <div class="gap-right--m">
                    <button @click="close()" class="btn btn--secondary">CLOSE</button>
                </div>
            </div>
        </div>
    </app-modal>
</template>

<script>
import CarbonResult from '../../components/CarbonResult.vue';
import AppModal from "../../components/AppModal.vue";
export default {
    name: "FootprintModal",
    components: { AppModal, CarbonResult },
    methods: {
        close: function () {
            this.$root.$data.stores.history.back({ name: 'footprint', params: { id: this.id } });
        },
    }
};
</script>

<style></style>
