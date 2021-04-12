<template>
    <div>
        <not-found v-if="!component" />
        <header-layout
            v-if="component"
            :title="modelName"
            :secondary="headerSecondary"
            :back-url="{ name: 'footprint.write.model', params: { id } }">
            <div class="column flex">
                <app-link :route="{ name: 'footprint.write.component.root.name' }" class="list-item list-item--interactive link--inherit column">
                    <div>Name</div>
                    <div class="secondary gap-top--s">{{ component.name }}</div>
                </app-link>
                <schema-stack :index="index"
                    :reference="reference"
                    :items="schemaItems"
                    :inputs="draft.inputs"/>
            </div>
        </header-layout>
    </div>
</template>

<script>
import HeaderLayout from "../layouts/HeaderLayout.vue";
import SchemaStack from "../../components/SchemaStack.vue";
import NotFound from '../NotFound.vue'
export default {
    name: "ComponentRootEdit",
    components: { HeaderLayout, NotFound, SchemaStack },
    props: {
        id: [ String, Number ],
        index: [ String, Number ],
        schema: [ Object, Boolean ],
        modelName: [ String ],
        reference: [ String ]
    },
    computed: {
        breadcrumps: function () {
            return ['Model', this.component.name]
        },
        headerSecondary: function () {
            return this.breadcrumps.join(" / ")
        },
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
            if (!this.schema || !this.schema.items) {
                return []
            }
            return this.schema.items
        },
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
