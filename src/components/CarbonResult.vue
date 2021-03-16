<template>
    <div :class="layoutClasses.root">
        <div class="primary large">{{ carbon | unitValue(2) | precision(1) }}</div>
        <div :class="layoutClasses.unit">
            <span class="carbon-unit carbon-unit--secondary">
                <span class="carbon-unit__weight">{{ carbon | unitLabelText(2) }}</span>
                <span class="column gap-l--s">
                    <span class="carbon-unit__of">of</span>
                    <span class="carbon-unit__co2">co<sub>2</sub></span>
                </span>
            </span>
        </div>
    </div>
</template>

<script>
export default {
    name: 'CarbonResult',
    props: {
        carbon: Number,
        layout: {
            type: String,
            default: 'column'
        }
    },
    data: function () {
        return {
            layouts: {
                column: {
                    root: ['column', 'center'],
                    unit: []
                },
                row: {
                    root: ['row', 'center', 'middle'],
                    unit: ['gap-left--s']
                }
            }
        }
    },
    computed: {
        layoutClasses: function () {
            return this.layouts[this.layout]
        }
    }
}
</script>

<style></style>
