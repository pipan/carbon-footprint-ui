<template>
    <div>
        <bar-chart
            v-if="isBar"
            :items="items"
            :colors="colors"
            class="chart"/>
        <doughnut-chart
            v-if="isDoughnut"
            :items="items"
            :colors="colors"
            class="chart"/>
    </div>
</template>

<script>
import BarChart from './BarChart.vue'
import DoughnutChart from './DoughnutChart.vue'

export default {
    name: 'ComponentChart',
    components: { DoughnutChart, BarChart },
    props: {
        items: {
            type: Array,
            default: () => []
        },
        type: {
            type: String,
            default: 'bar'
        }
    },
    data: function () {
        return {
            colors: ['#47919B', '#9c3232', '#47639b', '#a14382', '#66479b', '#479b5d', '#aec230']
        }
    },
    computed: {
        isBar: function () {
            return this.type == 'bar'
        },
        isDoughnut: function () {
            return this.type == 'doughnut'
        }
    }
}
</script>

<style></style>
