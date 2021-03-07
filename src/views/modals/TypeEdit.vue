<template>
    <modal title="Footprint Type" ref="modal">
        <div>
            <div class="modal__body">
                <div class="radio">
                    <div
                        v-for="(item, index) of items" 
                        :key="index"
                        class="radio__option"
                        :class="{'radio__option--selected': value == index}"
                        @click="select(index)">{{ item }}</div>
                </div>
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
    name: "TypeEdit",
    components: { Modal },
    data: function () {
        return {
            items: ['Production', 'Transportation', 'Use', 'Other'],
            value: 0
        }
    },
    methods: {
        close: function () {
            this.$refs.modal.close();
        },
        select: function (value) {
            this.value = value;
        }
    }
};
</script>

<style></style>
