<template>
    <modal title="New Footprint" ref="modal">
        <div>
            <div class="modal__body">
                <label for="footprint-name">Footprint Name</label>
                <input id="footprint-name" class="input" type="text" name="name" autocomplete="off" />
            </div>
            <div class="modal__footer">
                <router-link to="/footprint/1/update" class="btn btn--primary">CREATE</router-link>
                <div class="gap-right--m">
                    <button @click="close()" class="btn btn--secondary">CANCEL</button>
                </div>
            </div>
        </div>
    </modal>
</template>

<script>
import Modal from "../../components/Modal.vue";
export default {
    name: "CreateFootprint",
    components: { Modal },
    methods: {
        close: function () {
            this.$refs.modal.close();
        },
    }
};
</script>

<style></style>
