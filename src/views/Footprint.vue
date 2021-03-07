<template>
    <header-layout
        title="Book">
        <div>
            <footprint-context></footprint-context>
            <div>
                <carbon-result
                    class="gap-v--l"
                    carbon="0.34"></carbon-result>
                <div class="detail__inputs">
                    <button class="btn">
                        <div class="column center">
                            <span>220</span>
                            <span class="gap-top--s small secondary">pages</span>
                        </div>
                    </button>
                    <button class="btn">
                        <div class="column center">
                            <span>12 cm</span>
                            <span class="gap-top--s small secondary">width</span>
                        </div>
                    </button>
                    <button class="btn">
                        <div class="column center">
                            <span>27 cm</span>
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
                        <h3>Components</h3>
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
export default {
    name: "Footprint",
    components: { HeaderLayout, FootprintContext, CarbonResult },
    data: function () {
        return {
            item: {
                id: 1,
                carbon: 0.34,
                title: 'Book',
                description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam id dfgdf gd fgdfgf ...'
            }
        }
    }
};
</script>

<style></style>
