<template>
    <div>
        <not-found v-if="!schema" />
        <header-layout
            v-if="schema"
            :title="modelName"
            :secondary="breadcrumps"
            :back-url="{ name: 'footprint.write.model', params: { id } }">
            <div class="column flex">
                <div class="row middle interactive" @click="$refs.defaultSwitch.toggle()">
                    <div class="gap-h--m flex">Default</div>
                    <input-switch :value="schema.default" @change="setDefault($event)" ref="defaultSwitch" />
                </div>
                <schema-stack :index="index"
                    :reference="reference"
                    :inputs="draft.inputs"
                    :items="schemaItems"
                    :disabled="schema.default"/>
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
        id: [String, Number],
        index: [String, Number],
        reference: [String],
        schema: [Object, Boolean],
        modelName: [String]
    },
    data: function () {
        return {
            switchValue: false
        }
    },
    computed: {
        draft: function () {
            return this.$store.getters['draft/model']
        },
        schemaItems: function () {
            if (!this.schema || !this.schema.items) {
                return []
            }
            return this.schema.items
        },
        breadcrumps: function () {
            return 'Crumps of the Bread'
        }
    },
    methods: {
        setDefault: function (value) {
            this.$store.dispatch('draft/setInputDefault', {
                index: this.index,
                reference: this.reference,
                value: value
            })
        }
    },
    created: function () {
        this.$services.draft.load(this.id)
    },
    beforeDestroy: function () {
        // if (this.internalComponents != JSON.stringify(this.draft.components)) {
        //     this.$store.commit('draft/setComponents', JSON.parse(this.internalComponents))
        // }
        // if (this.internalOutput != this.draft.output_unit_id) {
        //     this.$store.commit('draft/setOutput', this.internalOutput)
        // }
    }
};
</script>

<style></style>
