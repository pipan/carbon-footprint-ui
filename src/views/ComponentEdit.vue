<template>
    <div>
        <not-found v-if="!component" />
        <header-layout
            v-if="component"
            :title="draft.name"
            :secondary="'Model / ' + component.name"
            :back-url="{ name: 'footprint.write.model', params: { id } }">
            <div class="column flex">
                <app-link :route="{ name: 'footprint.write.component.name', params: { id, index } }" class="list-item list-item--interactive link--inherit column">
                    <div>Name</div>
                    <div class="secondary gap-top--s">{{ component.name }}</div>
                </app-link>
                <div class="row middle gap-v--s gap-left--m overflow-visible">
                    <div class="gap-right--m flex">Schema</div>
                    <context-menu icon="add" ref="contextAdd">
                        <div class="column left">
                            <button class="btn context__item" @click.stop="createSchema('const')">Constant</button>
                            <button class="btn context__item" @click.stop="createSchema('input')">Input</button>
                        </div>
                    </context-menu>
                    <!-- <context-menu icon="close" ref="contextMultiply">
                        <div>
                            <button class="btn context__item" @click="createSchema('const:', '*')">Constant</button>
                        </div>
                    </context-menu> -->
                </div>
                <component-factor
                    v-for="(factor, index) of factors"
                    :key="index"
                    :item="factor.item"
                    :operation="factor.operation"
                    @click="openSchema(index)"
                    class="gap-h--m gap-v--tiny" />
            </div>
        </header-layout>
    </div>
</template>

<script>
import HeaderLayout from "./layouts/HeaderLayout.vue";
import ComponentFactor from "../components/ComponentFactor.vue";
import ContextMenu from "../components/ContextMenu.vue";
import NotFound from './NotFound.vue'
export default {
    name: "ComponentsEdit",
    components: { HeaderLayout, ComponentFactor, NotFound, ContextMenu },
    props: {
        id: [String, Number],
        index: [String, Number]
    },
    computed: {
        draft: function () {
            return this.$store.getters['draft/model']
        },
        component: function () {
            if (!this.draft.components) {
                return false
            }
            return this.draft.components[this.index]
        },
        schemaItems: function () {
            if (!this.component || !this.component.schema.items) {
                return []
            }
            return this.component.schema.items
        },
        factors: function () {
            let result = []
            for (let i = 0; i < this.schemaItems.length; i += 2) {
                result.push({
                    item: this.component.schema.items[i],
                    operation: i > 0 ? this.component.schema.items[i - 1] : false,
                })
            }
            return result
        }
    },
    methods: {
        openSchema: function (schemaIndex) {
            this.$services.history.push({
                name: 'footprint.write.schema.const',
                params: {
                    id: this.id,
                    index: this.index,
                    schemaIndex: schemaIndex
                }
            })
        },
        createSchema: function (type) {
            this.$services.history.push({
                name: 'footprint.write.schema.' + type + '.create',
                params: {
                    id: this.id,
                    index: this.index
                }
            })
            this.$refs.contextAdd.close()
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
