<template>
    <app-modal
        modal-title="Name"
        @click-outside="close()">
        <div>
            <form @submit.prevent="submit()">
                <div class="modal__body">
                    <input id="footprint-name"
                        class="input"
                        type="text"
                        name="name"
                        autocomplete="off"
                        v-model="value"
                        v-app-autofocus="true"/>
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
    name: "ComponentNameEdit",
    components: { AppModal },
    props: {
        id: [ String, Number ],
        componentId: [ String ]
    },
    data: function () {
        return {
            internalValue: false
        }
    },
    computed: {
        draft: function () {
            return this.$store.getters['draft/model']
        },
        component: function () {
            return this.$store.getters['draft/component'](this.componentId)
        },
        value: {
            get: function () {
                if (this.internalValue !== false) {
                    return this.internalValue
                }
                return this.component ? this.component.name : ""
            },
            set: function (value) {
                this.internalValue = value
            }
        }
    },
    methods: {
        close: function () {
            this.$services.history.back({
                name: 'footprint.write.component.reference',
            })
        },
        submit: function () {
            this.$store.dispatch('draft/setComponentName', {
                id: this.componentId,
                value: this.value
            }).then(() => {
                this.close()
            })
        }
    }
};
</script>

<style></style>
