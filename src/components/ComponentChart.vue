<script>
import { Bar } from 'vue-chartjs'

export default {
    name: 'ComponentChart',
    extends: Bar,
    methods: {
        select: function (event) {
            this.$emit('select', event)
        }
    },
    mounted () {
        const self = this;
        this.renderChart({
            labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
            datasets: [{
                barThickness: 36,
                data: [30, 18, 12, 11, 7, 2],
                backgroundColor: [
                    'rgba(117, 208, 102, 1)',
                    'rgba(59, 109, 236, 1)',
                    'rgba(205, 205, 205, 1)',
                    'rgba(59, 109, 236, 1)',
                    'rgba(205, 205, 205, 1)',
                    'rgba(230, 234, 41, 1)'
                ],
                borderWidth: 0
            }]
        }, {
            responsive: true,
            maintainAspectRatio: false,
            legend: {
                display: false
            },
            onClick: function (point, event) {
                console.log(point, event);
                if (event.length <= 0) {
                    return;
                }
                self.select(event);
            },
            scales: {            
                yAxes: [{
                    gridLines: {
                        display: true,
                        color: 'rgba(255, 255, 255, 0.1)',
                        tickMarkLength: 0,
                    },
                    scaleLabel: {
                        display: true,
                        labelString: '% of emited CO2',
                        color: 'rgba(255, 255, 255, 1)'
                    },
                    ticks: {
                        beginAtZero: true,
                        padding: 16
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
}
</script>

<style></style>
