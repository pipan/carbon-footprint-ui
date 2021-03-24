<template>
    <model-edit-layout
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
                <div v-for="(component, index) of components"
                    :key="index"
                    @click="openComponent(index)"
                    class="gap-left--m gap-right--s gap-v--tiny interactive row middle">
                        <div class="flex thin">{{ component.name }}</div>
                        <button type="button" class="btn btn--circle btn--grey" @click.stop="removeComponent(index)">
                            <span class="material-icons">delete_outline</span>
                        </button>
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
export default {
    name: "ModelEdit",
    components: { ModelEditLayout },
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
                    params: { id: this.id }
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
        openComponent: function (index) {
            this.$services.history.push({
                name: 'footprint.write.component',
                params: {
                    id: this.id,
                    index: index
                }
            })
        },
        createComponent: function () {
            this.$store.commit('draft/addComponent', {
                name: 'Empty',
                schema: {
                    type: 'stack',
                    items: []
                }
            })
            this.openComponent(this.components.length - 1)
        },
        removeComponent: function (index) {
            this.$store.commit('draft/removeComponent', {
                index: index
            })
        }
    },
    created: function () {
        this.$services.draft.load(this.id)
        this.internalOutput = this.draft.output_unit_id
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
