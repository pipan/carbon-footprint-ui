<template>
    <div class="column center">
        <div class="primary large">{{ carbon | unitValue("weight") }}</div>
        <div class="gap-top--s">
            <span class="carbon-unit carbon-unit--secondary">
                <span class="carbon-unit__weight">{{ carbon | unitLabel("weight") }}</span>
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
    props: ['carbon']
}
</script>

<style></style>
