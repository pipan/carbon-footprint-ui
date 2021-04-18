<script>
import { Bar } from 'vue-chartjs'

export default {
    name: 'BarChart',
    extends: Bar,
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
        chartData: function () {
            let result = []
            for (let item of this.items) {
                result.push({
                    x: item.name,
                    y: Math.round(item.value / this.sum * 100),
                    z: item.value
                })
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
                    barThickness: 28,
                    data: this.chartData,
                    backgroundColor: this.chartColors,
                    hoverBackgroundColor: this.chartColors,
                    borderWidth: 0,
                    minBarLength: 4
                }]
            }, {
                responsive: true,
                maintainAspectRatio: false,
                legend: {
                    display: false
                },
                animation: {
                    duration: 0
                },
                onClick: function (point, event) {
                    if (event.length <= 0) {
                        return;
                    }
                    self.select(event);
                },
                tooltips: {
                    callbacks: {
                        label: function (label) {
                            return label.value + " %"
                        },
                        afterBody: function (item, data) {
                            let index = item[0].index
                            let carbonValue = data.datasets[0].data[index].z
                            return self.$options.filters.unitHuman(carbonValue, 9)
                        }
                    },
                    bodySpacing: 12,
                    bodyFontSize: 14,
                    titleSpacing: 12,
                    titleFontSize: 16,
                    xPadding: 12,
                    yPadding: 12
                },
                scales: {            
                    yAxes: [{
                        gridLines: {
                            display: true,
                            color: 'rgba(255, 255, 255, 0.1)',
                            tickMarkLength: 0,
                            zeroLineColor: 'rgba(255, 255, 255, 0.1)'
                        },
                        ticks: {
                            min: 0,
                            max: 100,
                            maxTicksLimit: 10,
                            beginAtZero: true,
                            padding: 16,
                            callback: function(value) {
                                return value + " %"
                            }
                        }
                    }],
                    xAxes: [{
                        gridLines: {
                            display: false
                        }
                    }]
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
