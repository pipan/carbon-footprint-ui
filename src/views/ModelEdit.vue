<template>
    <model-edit-layout
        :id="id"
        :header="header"
        :inputs="draft.inputs">
        <div class="column flex">
            <div class="row middle gap--s gap-left--m">
                <div class="gap-right--m flex">Components</div>
                <button class="btn btn--circle" @click="createComponent()">
                    <span class="material-icons">add</span>
                </button>
            </div>
            <div class="column flex">
                <div class="gap--m secondary row center flex thin" v-if="!hasComponents">
                    Start by adding a component for this model
                </div>
                <div v-for="component of components"
                    :key="component.id"
                    @click="openComponent(component.id)"
                    class="gap--m interactive row middle overflow-visible">
                        <div class="flex secondary">{{ component.name }}</div>
                        <div class="abs abs--right">
                            <context-menu>
                                <div class="column left">
                                    <button class="btn context__item" @click="removeComponent(component.id)">Remove</button>
                                </div>
                            </context-menu>
                        </div>
                </div>
            </div>
            <div class="row center middle gap--m">
                <label class="label--inline" for="output_unit_id">Output</label>
                <select id="output_unit_id" v-model="internalOutput">
                    <option
                        v-for="unit of $store.state.unit.items"
                        :key="unit.id"
                        :value="unit.id">{{ unit.name }}</option>
                </select>
            </div>
        </div>
    </model-edit-layout>
</template>

<script>
import ModelEditLayout from "./layouts/ModelEditLayout.vue";
import ContextMenu from '../components/ContextMenu.vue'
export default {
    name: "ModelEdit",
    components: { ModelEditLayout, ContextMenu },
    props: {
        id: [String, Number]
    },
    data: function () {
        return {
            internalOutput: 1
        }
    },
    computed: {
        header: function () {
            return {
                title: this.draft.name,
                secondary: 'Model',
                backUrl: {
                    name: 'footprint.write',
                }
            }
        },
        draft: function () {
            return this.$store.getters['draft/model']
        },
        components: function () {
            return this.draft.components
        },
        hasComponents: function () {
            return this.components.length > 0
        }
    },
    methods: {
        openComponent: function (id) {
            this.$services.history.push({
                name: 'footprint.write.component.reference',
                params: {
                    id: this.id,
                    componentId: id,
                    reference: 'root'
                }
            })
        },
        createComponent: function () {
            this.$store.dispatch('draft/createComponent')
                .then((result) => {
                    this.openComponent(result.id)
                })
        },
        removeComponent: function (id) {
            this.$store.dispatch('draft/removeComponent', id)
        }
    },
    created: function () {
        this.$services.draft.load(this.id)
        this.internalOutput = this.draft.output_unit_id
    }
};
</script>

<style></style>
