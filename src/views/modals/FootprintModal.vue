<template>
    <app-modal
        modal-title="Cover Transportation"
        @click-outside="close()">
        <div>
            <div class="modal__body">
                <div class="row middle">
                    <carbon-result class="gap-h--l" :carbon="110"></carbon-result>
                    <div class="column">
                        <div>weight: 60g</div>
                        <div class="gap-top--s">distance: {{ 120000000 | unitHuman("length")}}</div>
                    </div>
                </div>
            </div>
            <div class="modal__footer">
                <button class="btn btn--primary">OPEN</button>
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
    props: ['id', 'componentId'],
    methods: {
        close: function () {
            this.$services.history.back({ name: 'footprint', params: { id: this.id } });
        },
        openFootprint: function (id) {
            this.$services.history.replace({
                name: 'footprint',
                params: {
                    id: id
                }
            })
        }
    }
};
</script>

<style></style>
