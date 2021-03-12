<template>
    <app-modal
        modal-title="Number of Pages"
        @click-outside="close()">
        <div>
            <div class="modal__body">
                <div class="row">
                    <input id="footprint-name" class="input" type="text" name="name" autocomplete="off" />
                    <div class="gap-left--m">
                        <select name="unit">
                            <option>mm</option>
                            <option>cm</option>
                            <option>m</option>
                            <option>km</option>
                        </select>
                    </div>
                </div>
            </div>
            <div class="modal__footer">
                <router-link to="/footprint/2" class="btn btn--primary">SET</router-link>
                <div class="gap-right--m">
                    <button @click="close()" class="btn btn--secondary">CLOSE</button>
                </div>
            </div>
        </div>
    </app-modal>
</template>

<script>
import AppModal from "../../components/AppModal.vue";
export default {
    name: "FootprintInput",
    props: ['id', 'inputId'],
    components: { AppModal },
    methods: {
        close: function () {
            this.$services.history.back({ name: 'footprint', params: { id: this.id } });
        },
    }
};
</script>

<style></style>
