<script>
import { Doughnut } from 'vue-chartjs'

export default {
    name: 'DoughnutChart',
    extends: Doughnut,
    props: {
        items: {
            type: Array,
            default: () => []
        },
        colors: {
            type: Array,
            default: () => []
        }
    },
    computed: {
        sum: function () {
            let result = 0
            for (let item of this.items) {
                result += item.value
            }
            return result
        },
        percentage: function () {
            let result = []
            for (let item of this.items) {
                result.push(Math.round(item.value / this.sum * 100))
            }
            return result
        },
        chartData: function () {
            let result = []
            for (let item of this.items) {
                result.push(item.value)
            }
            return result
        },
        chartLabels: function () {
            let result = []
            for (let item of this.items) {
                result.push(item.name)
            }
            return result
        },
        chartColors: function () {
            let result = []
            this.items.forEach((item, index) => {
                result.push(this.getColor(index))
            })
            return result
        }
    },
    methods: {
        select: function (event) {
            this.$emit('select', event)
        },
        getColor: function (index) {
            return this.colors[index % this.colors.length]
        },
        render: function () {
            const self = this;
            this.renderChart({
                labels: this.chartLabels,
                datasets: [{
                    data: this.chartData,
                    backgroundColor: this.chartColors,
                    hoverBackgroundColor: this.chartColors,
                    borderWidth: 4,
                    borderColor: '#15141a'
                }]
            }, {
                responsive: true,
                maintainAspectRatio: false,
                legend: {
                    position: 'right'
                },
                animation: {
                    duration: 0
                },
                cutoutPercentage: 75,
                onClick: function (point, event) {
                    console.log(point, event);
                    if (event.length <= 0) {
                        return;
                    }
                    self.select(event);
                },
                tooltips: {
                    callbacks: {
                        title: function (item, data) {
                            var index = item[0].index
                            return data.labels[index]
                        },
                        label: function (item) {
                            var index = item.index
                            return self.percentage[index] + " %"
                        },
                        afterBody: function (item, data) {
                            let index = item[0].index
                            let carbonValue = data.datasets[0].data[index]
                            return self.$options.filters.unitHuman(carbonValue, 9)
                        }
                    },
                    bodySpacing: 12,
                    bodyFontSize: 14,
                    titleSpacing: 12,
                    titleFontSize: 16,
                    xPadding: 12,
                    yPadding: 12
                }
            })
        }
    },
    watch: {
        items: function () {
            this.render()
        }
    },
    mounted () {
        this.render()
    }
}
</script>

<style></style>
