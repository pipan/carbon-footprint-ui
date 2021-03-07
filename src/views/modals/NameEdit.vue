<template>
    <modal title="Footprint Name" ref="modal">
        <div>
            <div class="modal__body">
                <input id="footprint-name" class="input" type="text" name="name" autocomplete="off" />
            </div>
            <div class="modal__footer">
                <button class="btn btn--primary">SAVE</button>
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
    name: "NameEdit",
    components: { Modal },
    methods: {
        close: function () {
            this.$refs.modal.close();
        },
    }
};
</script>

<style></style>
