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
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)'
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
                self.select(event);
            },
            scales: {            
                yAxes: [{
                    gridLines: {
                        display: true,
                        color: 'rgba(255, 255, 255, 0.1)',
                        tickMarkLength: 0,
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
