<template>
    <app-modal
        modal-title="Name"
        @click-outside="close()">
        <div>
            <form @submit.prevent="submit()">
                <div class="modal__body">
                    <input id="footprint-name" class="input" type="text" name="name" autocomplete="off" v-model="internalValue" />
                </div>
                <div class="modal__footer">
                    <button type="submit" class="btn btn--primary">SAVE</button>
                    <div class="gap-right--m">
                        <button type="button" @click="close()" class="btn btn--secondary">CANCEL</button>
                    </div>
                </div>
            </form>
        </div>
    </app-modal>
</template>

<script>
import AppModal from "../../components/AppModal.vue";
export default {
    name: "NameEdit",
    components: { AppModal },
    props: {
        id: [ String, Number ]
    },
    data: function () {
        return {
            internalValue: ""
        }
    },
    computed: {
        draft: function () {
            return this.$store.getters['draft/model']
        }
    },
    methods: {
        close: function () {
            this.$services.history.back({
                name: 'footprint.write',
                params: {
                    id: this.id
                }
            })
        },
        submit: function () {
            this.$store.commit('draft/setName', this.internalValue)
            this.close()
        }
    },
    created: function () {
        this.internalValue = this.draft.name
    }
};
</script>

<style></style>
