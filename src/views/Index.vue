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
                <router-link class="link--no-style" to="article/what-is-a-carbon-footprint">What is a carbon footprint?</router-link>
            </h3>
            <p class="secondary compact no-gap-before">
            Carbon footrprint is the amount of greanhouse gases released into the
            atmosphere during production, transpor...
            </p>
        </article>
        <article class="column gap-top--l">
            <h3>
                <router-link class="link--no-style" to="article/2">
                    <span>Why is footprint measured in </span>
                    <span class="carbon-unit">
                    <span class="carbon-unit__weight">kg</span>
                    <span class="column gap-l--s">
                        <span class="carbon-unit__of">of</span>
                        <span class="carbon-unit__co2">co<sub>2</sub></span>
                    </span>
                    </span>
                    <span>?</span>
                </router-link>
            </h3>
            <p class="secondary compact no-gap-before">
            CO2 is the most iconic greenhouse gas molecule. Therofore, it is used
            as a standard measure for carbon footrpint. Global war...
            </p>
        </article>
        <article class="column gap-top--l">
            <h3>
                <router-link class="link--no-style" to="article/3">How can I create a new footprint?</router-link>
            </h3>
            <p class="secondary compact no-gap-before">
            Every footprint is internaly represented as a mathematical function.
            This function can accept any number of inputs. The output ...
            </p>
        </article>
        </div>
    </div>
</template>

<script>
export default {
    name: "Index"
};
</script>

<style></style>
