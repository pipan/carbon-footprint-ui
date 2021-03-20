<template>
    <div>
        <not-found
            v-if="isNotFound"
            description="Footprint does not exists"/>
        <header-layout
            v-if="isOk"
            :title="$store.state.footprint.item.name"
            :back-url="{ name: 'index' }">
            <div class="rel" v-if="$store.state.footprint.item">
                <footprint-context :id="id"/>
                <div>
                    <div class="large">
                        <carbon-result
                            class="gap-top--l"
                            :carbon="$store.state.footprint.item.eval"
                            layout="row"/>
                    </div>
                    <div class="gap-top--l" v-if="hasInput">
                        <div class="detail__inputs gap-h--m">
                            <button
                                v-for="input in $store.state.footprint.item.inputs"
                                :key="input.name"
                                @click="openInput(input.id)"
                                class="btn">
                                <div class="column center">
                                    <span>{{ input.value | unitHuman(input.unit.id) }}</span>
                                    <span class="gap-top--s small secondary">{{ input.name }}</span>
                                </div>
                            </button>
                        </div>
                    </div>
                    <div class="gap-v--l gap-h--m">
                        <section>
                            <h3>Description</h3>
                            <p>{{ $store.state.footprint.item.description }}</p>
                        </section>
                        <section class="gap-top--l">
                            <h3>Components</h3>
                            <component-chart 
                                class="chart gap-top--m"
                                :items="chartItems"
                                @select="openComponent('cmp')"/>
                        </section>
                    </div>
                </div>
            </div>
        </header-layout>
    </div>
</template>

<script>
import FootprintContext from "../components/FootprintContext.vue";
import HeaderLayout from "./layouts/HeaderLayout.vue";
import CarbonResult from "../components/CarbonResult.vue";
import ComponentChart from '../components/ComponentChart.vue';
import NotFound from './NotFound.vue';
export default {
    name: "Footprint",
    props: ['id'],
    components: { HeaderLayout, FootprintContext, CarbonResult, ComponentChart, NotFound },
    methods: {
        openComponent: function (componentId) {
            this.$services.history.push({
                name: 'footprint.component',
                params: {
                    id: this.id,
                    componentId: componentId,    
                },
                query: this.$route.query
            })
        },
        openInput: function (inputId) {
            this.$services.history.push({
                name: 'footprint.input',
                params: {
                    id: this.id,
                    inputId: inputId
                },
                query: this.$route.query
            })
        }
    },
    computed: {
        hasInput: function () {
            return this.$store.state.footprint.item.inputs
                && this.$store.state.footprint.item.inputs.length > 0;
        },
        chartItems: function () {
            let items = []
            for (let item of this.$store.state.footprint.item.components) {
                items.push({
                    name: item.name,
                    value: item.eval
                })
            }
            return items
        },
        isNotFound: function () {
            return !this.isOk && this.$store.state.footprint.error.status === 404
        },
        isOk: function () {
            return this.$store.state.footprint.error === false
        }
    },
    created: function () {
        this.$store.dispatch('footprint/load', { id: this.id, inputs: this.$route.query })
    },
    watch: {
        id: function (newValue) {
            this.$store.dispatch('footprint/load', { id: newValue, inputs: this.$route.query })
        },
        $route: function (newValue, oldValue) {
            // console.log("watch", newValue.query, oldValue.query)
            // if (JSON.stringify(newValue.query) === JSON.stringify(oldValue.query)) {
            //     return
            // }
            console.log("refresh", newValue.query, oldValue.query)
            this.$store.dispatch('footprint/refresh', {id: this.id, inputs: newValue.query})
        }
    }
};
</script>

<style></style>
