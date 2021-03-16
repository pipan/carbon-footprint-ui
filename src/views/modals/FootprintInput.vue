<template>
    <app-modal
        v-if="input"
        :modal-title="input.name | titleCase"
        @click-outside="close()">
        <div>
            <form @submit.prevent="submit()">
                <div class="modal__body">
                    <unit-input
                        :unit-id="input.unit.id"
                        :value="input.value"
                        @change="onChange($event)" />
                </div>
                <div class="modal__footer">
                    <button type="submit" class="btn btn--primary">SET</button>
                    <div class="gap-right--m">
                        <button @click="close()" class="btn btn--secondary">CLOSE</button>
                    </div>
                </div>
            </form>
        </div>
    </app-modal>
</template>

<script>
import AppModal from "../../components/AppModal.vue";
import UnitInput from "../../components/UnitInput.vue";
export default {
    name: "FootprintInput",
    props: ['id', 'inputId'],
    components: { AppModal, UnitInput },
    data: function () {
        return {
            value: 0
        }
    },
    computed: {
        input: function () {
            return this.$store.getters['footprint/inputMap'][this.inputId]
        }
    },
    methods: {
        close: function () {
            this.$services.history.back({ name: 'footprint', params: { id: this.id, query: this.$route.query } });
        },
        onChange: function (value) {
            this.value = value
        },
        submit: function () {
            let query = this.$route.query;
            query[this.input.name] = this.value + ""
            this.$services.history.replace({
                path: '/footprint/' + this.id,
                query: query
            })
        },
    },
    watch: {
        input: function (newValue) {
            if (!newValue) {
                this.value = ""
                return
            }
            this.value = newValue.default_value
        }
    },
    mounted: function () {
        if (!this.input) {
            this.value = ""
            return
        }
        this.value = this.input.default_value
    }
};
</script>

<style></style>
