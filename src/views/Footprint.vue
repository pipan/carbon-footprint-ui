<template>
    <div>
        <not-found v-if="isNotFound"
            description="Footprint does not exists"/>
        <server-error v-if="isServerError" />
        <footer-layout>
            <header-layout
                v-if="isOk"
                :title="item.name"
                action="search"
                action-icon="search"
                :back-url="{ name: 'index' }"
                @action="goTo({ name: 'index' })">
                <div class="rel" v-if="item">
                    <footprint-context :id="id" class="gap--s"/>
                    <div>
                        <div class="large">
                            <carbon-result
                                class="gap-top--l"
                                :carbon="item.eval"
                                layout="row"/>
                        </div>
                        <div class="gap-top--l" v-if="hasInput">
                            <div class="detail__inputs row wrap gap-grid--s">
                                <input-button v-for="input in item.inputs"
                                    :key="input.name"
                                    :name="input.value | unitHuman(input.unit.id)"
                                    :secondary="input.name"
                                    @click="openInput(input.reference)"/>
                            </div>
                        </div>
                        <div class="gap-v--l gap-h--m">
                            <section>
                                <h3>Description</h3>
                                <vue-markdown>{{ item.description }}</vue-markdown>
                            </section>
                            <section class="gap-top--l">
                                <div class="row middle">
                                    <h3 class="flex">Components</h3>
                                    <input-swich-icon
                                        :value="chartSwitchValue"
                                        :options="chartSwitchOptions"
                                        @change="chartSwitchValue = $event"/>
                                </div>
                                <component-chart 
                                    class="gap-top--m"
                                    :items="chartItems"
                                    :type="chartSwitchValue"
                                    @select="openComponent('cmp')"/>
                            </section>
                        </div>
                    </div>
                </div>
            </header-layout>
        </footer-layout>
    </div>
</template>

<script>
import FootprintContext from "../components/FootprintContext.vue";
import HeaderLayout from "./layouts/HeaderLayout.vue";
import CarbonResult from "../components/CarbonResult.vue";
import ComponentChart from '../components/ComponentChart.vue';
import InputSwichIcon from '../components/InputSwichIcon.vue';
import NotFound from './NotFound.vue';
import ServerError from './ServerError.vue';
import InputButton from '../components/InputButton.vue';
import VueMarkdown from 'vue-markdown'
import FooterLayout from './layouts/FooterLayout.vue';
export default {
    name: "Footprint",
    props: {
        id: [ String, Number ]
    },
    components: { HeaderLayout, FootprintContext, CarbonResult, ComponentChart, NotFound, InputSwichIcon, InputButton, ServerError, VueMarkdown, FooterLayout },
    metaInfo: function () {
        if (!this.item) {
            return {
                title: "Carbon Footprint",
            }
        }
        let inputs = []
        for (let input of this.item.inputs) {
            inputs.push(input.name + " is " + this.$options.filters.unitHuman(input.value, input.unit.id))
        }

        let inputDescription = ""
        if (inputs.length > 0) {
            inputDescription = " when " + inputs.join(", ")
        }
        
        return {
            title: this.item.name + " | Carbon Footprint",
            meta: [
                {
                    name: "description",
                    content: "Carbon footprint of " + this.item.name + " is " + this.$options.filters.unitHuman(this.item.eval, 9) + inputDescription + ". " + this.$options.filters.markdownParagraph(this.item.description)
                }, {
                    name: "keywords",
                    content: "carbon footprint, co2, atmosphere, footprint, environment, eco, ecology, emissions, human impact, global warming, sustainability, calculator, responsibility, earth"
                }
            ]
        }
    },
    data: function () {
        return {
            chartSwitchValue: 'bar',
            chartSwitchOptions: [
                {
                    value: 'bar',
                    icon: 'bar_chart'
                },
                {
                    value: 'doughnut',
                    icon: 'donut_large'
                }
            ]
        }
    },
    methods: {
        openComponent: function (componentId) {
            console.log("open component", componentId)
            // this.$services.history.push({
            //     name: 'footprint.component',
            //     params: {
            //         id: this.id,
            //         componentId: componentId,    
            //     },
            //     query: this.$route.query
            // })
        },
        openInput: function (inputReference) {
            this.$services.history.push({
                name: 'footprint.input',
                params: {
                    id: this.id,
                    inputReference: inputReference
                },
                query: this.$route.query
            })
        },
        goTo: function (route) {
            this.$services.history.push(route)
        }
    },
    computed: {
        error: function () {
            return this.$store.state.footprint.error
        },
        item: function () {
            return this.$store.state.footprint.item
        },
        hasInput: function () {
            return this.item.inputs
                && this.item.inputs.length > 0;
        },
        chartItems: function () {
            let items = []
            for (let item of this.item.components) {
                items.push({
                    name: item.name,
                    value: item.eval
                })
            }
            return items
        },
        isNotFound: function () {
            return !this.isOk && this.error.status === 404
        },
        isServerError: function () {
            return !this.isOk && this.error.status >= 500
        },
        isOk: function () {
            return this.error === false
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
