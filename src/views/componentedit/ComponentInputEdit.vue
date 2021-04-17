<template>
    <div>
        <not-found v-if="!schema" />
        <header-layout
            v-if="schema"
            :title="footprintName"
            :secondary="headerSecondary"
            :back-url="{ name: 'footprint.write.model' }">
            <div class="column flex">
                <div class="row middle interactive" @click="$refs.defaultSwitch.toggle()">
                    <div class="gap-h--m flex">Default</div>
                    <input-switch :value="schema.default" @change="setDefault($event)" ref="defaultSwitch" />
                </div>
                <schema-stack :componentId="componentId"
                    :reference="reference"
                    :items="schemaItems"
                    :inputs="draft.inputs"
                    @selectItem="openItem($event)"
                    @selectReference="openReference($event)" />
            </div>
        </header-layout>
    </div>
</template>

<script>
import HeaderLayout from "../layouts/HeaderLayout.vue";
import NotFound from '../NotFound.vue'
import InputSwitch from "../../components/InputSwitch.vue";
import SchemaStack from "../../components/SchemaStack.vue";
export default {
    name: "ComponentInputEdit",
    components: { HeaderLayout, NotFound, InputSwitch, SchemaStack },
    props: {
        componentId: [ Number, String ],
        reference: [ String ],
        component: [ Object, Boolean ],
        footprintName: [ String ],
        schema: [ Object, Boolean ]
    },
    data: function () {
        return {
            switchValue: false
        }
    },
    computed: {
        parent: function () {
            return this.$store.getters['draft/reference'](this.componentId, this.schema.parent)
        },
        breadcrumps: function () {
            return ['Function', this.parent.model.name, this.schema.model.name]
        },
        headerSecondary: function () {
            return this.breadcrumps.join(" &#x27A4; ")
        },
        draft: function () {
            return this.$store.getters['draft/model']
        },
        schemaItems: function () {
            if (!this.schema || !this.schema.items) {
                return []
            }
            return this.schema.items
        },
    },
    methods: {
        setDefault: function (value) {
            this.$store.dispatch('draft/setInputDefault', {
                componentId: this.componentId,
                reference: this.reference,
                value: value
            })
        },
        openItem: function (ref) {
            this.$services.history.push({
                name: 'footprint.write.schema',
                params: {
                    itemReference: ref
                }
            })
        },
        openReference: function (ref) {
            this.$services.history.push({
                name: 'footprint.write.component.reference',
                params: {
                    reference: ref
                }
            })
        }
    }
};
</script>

<style></style>
