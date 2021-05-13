<template>
    <div>
        <div class="row space-around gap-v--l gap-h--m">
        <div class="column center gap--l">
            <div class="">1.2k</div>
            <div class="primary small gap-top--s">footprints</div>
        </div>
        <div class="column center gap--l">
            <div class="">400</div>
            <div class="primary small gap-top--s">verified</div>
        </div>
        <div class="column center gap--l">
            <div class="">6</div>
            <div class="primary small gap-top--s">countries</div>
        </div>
        </div>
        <div class="column gap-h--m gap-bottom--l">
        <article class="column">
            <h3>
                <app-link class="link--no-style" route="article/what-is-a-carbon-footprint">What is a carbon footprint?</app-link>
            </h3>
            <p class="secondary compact no-gap-after">
            Carbon footprint is the amount of greenhouse gases, you released into the atmosphere. You are increasing your footprint by every ...
            </p>
        </article>
        <article class="column gap-top--l">
            <h3>
                <app-link class="link--no-style" route="article/why-is-footprint-measured-in-kg-of-co2">
                    <span>Why is footprint measured in </span>
                    <span class="carbon-unit">
                    <span class="carbon-unit__weight">kg</span>
                    <span class="column gap-l--s">
                        <span class="carbon-unit__of">of</span>
                        <span class="carbon-unit__co2">co<sub>2</sub></span>
                    </span>
                    </span>
                    <span>?</span>
                </app-link>
            </h3>
            <p class="secondary compact no-gap-after">
            CO<sub>2</sub> is the most iconic greenhouse gas molecule. When we talk about global warming we probably imagine burnig stuff. And ...
            </p>
        </article>
        <article class="column gap-top--l">
            <h3>
                <app-link class="link--no-style" route="article/how-do-we-model-footprints">How do we model footprints?</app-link>
            </h3>
            <p class="secondary compact no-gap-after">
            Primary goal of every model is to show you the amount of CO2 released into the atmosphere. To get to the final number we need ...
            </p>
        </article>
        </div>
    </div>
</template>

<script>
export default {
    name: "Index",
    metaInfo: {
        title: "Carbon Footprint",
        meta: [
            {
                name: "description",
                content: "Carbon footprint is the amount of greenhouse gases, you released into the atmosphere. You are increasing your footprint by every activity you do. Calculate your impact on our atmoshpere and start reducing your carbon footprint. You can make better decision with the right information."
            }, {
                name: "keywords",
                content: "carbon footprint, co2, atmosphere, footprint, environment, eco, ecology, emissions, human impact, global warming, sustainability, calculator, responsibility, earth"
            }
        ]
    }
};
</script>

<style></style>
