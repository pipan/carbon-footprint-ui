<template>
    <div>
        <not-found v-if="!component" />
        <header-layout
            v-if="component"
            :title="footprintName"
            :secondary="headerSecondary"
            :back-url="{ name: 'footprint.write.model' }">
            <div class="column flex">
                <app-link :route="{ name: 'footprint.write.component.name' }" class="list-item list-item--interactive link--inherit column">
                    <div>Name</div>
                    <div class="secondary gap-top--s">{{ component.name }}</div>
                </app-link>
                <schema-stack :componentId="componentId"
                    :reference="'root'"
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
import SchemaStack from "../../components/SchemaStack.vue";
import NotFound from '../NotFound.vue'
export default {
    name: "ComponentRootEdit",
    components: { HeaderLayout, NotFound, SchemaStack },
    props: {
        componentId: [ Number, String ],
        component: [ Object, Boolean ],
        footprintName: [ String ],
        schema: [ Object, Boolean ]
    },
    computed: {
        breadcrumps: function () {
            return ['Component', this.component.name]
        },
        headerSecondary: function () {
            return this.breadcrumps.join(" &bullet; ")
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
