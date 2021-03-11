<template>
    <header-layout
        title="Book"
        :back-url="{ name: 'index' }">
        <div class="rel">
            <footprint-context/>
            <div>
                <carbon-result
                    class="gap-v--l"
                    carbon="0.34" />
                <div class="detail__inputs">
                    <router-link to="input/pages" append class="btn">
                        <div class="column center">
                            <span>220</span>
                            <span class="gap-top--s small secondary">pages</span>
                        </div>
                    </router-link>
                    <button class="btn" @click="$root.$data.stores.history.reset()">
                        <div class="column center">
                            <span>{{ 120 | unit("length") }}</span>
                            <span class="gap-top--s small secondary">width</span>
                        </div>
                    </button>
                    <button class="btn">
                        <div class="column center">
                            <span>{{ 270 | unit("length") }}</span>
                            <span class="gap-top--s small secondary">height</span>
                        </div>
                    </button>
                </div>
                <div class="gap-v--l gap-h--m">
                    <section>
                        <h3>Description</h3>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam id enim nec nulla ultrices tempus ac a sapien. Maecenas eu lobortis nisl. Mauris posuere consectetur metus, quis tempus purus tincidunt et.</p>
                    </section>
                    <section class="gap-top--l">
                        <h3 @click="openComponent()">Components</h3>
                        <component-chart class="chart gap-v--m"></component-chart>
                    </section>
                </div>
            </div>
        </div>
    </header-layout>
</template>

<script>
import FootprintContext from "../components/FootprintContext.vue";
import HeaderLayout from "../components/HeaderLayout.vue";
import CarbonResult from "../components/CarbonResult.vue";
import ComponentChart from '../components/ComponentChart.vue';
export default {
    name: "Footprint",
    components: { HeaderLayout, FootprintContext, CarbonResult, ComponentChart },
    data: function () {
        return {
            item: {
                id: 1,
                carbon: 0.34,
                title: 'Book',
                description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam id dfgdf gd fgdfgf ...'
            }
        }
    },
    methods: {
        openComponent: function () {
            this.$router.push({
                path: 'component/id',
                append: true
            })
        }
    }
};
</script>

<style></style>
