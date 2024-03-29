<template>
    <div>
        <not-found v-if="!exists"
            description="Article does not exists"/>
        <footer-layout>
            <header-layout v-if="exists"
                :title="article.title"
                :back-url="{ name: 'index' }">
                <div class="gap--m">
                    <vue-markdown :source="article.body"></vue-markdown>
                </div>
            </header-layout>
        </footer-layout>
    </div>
</template>

<script>
import HeaderLayout from './layouts/HeaderLayout.vue';
import FooterLayout from './layouts/FooterLayout.vue';
import NotFound from './NotFound.vue';
import VueMarkdown from 'vue-markdown'
export default {
    name: "Article",
    components: { HeaderLayout, FooterLayout, VueMarkdown, NotFound },
    props: {
        slug: [ String ]
    },
    data: function () {
        return {
            articles: {
                'about': {
                    title: 'About',
                    body: "#### License\n\n[CC BY-SA 3.0](https://creativecommons.org/licenses/by-sa/3.0/)\n\n#### Contact\n\n[carbonfootprint@gmail.com](mailto:carbonfootprint@gmail.com)\n\n#### Year of birth\n\n 2021\n\n#### Our mission\n\nWe want to inform, as precisly as we can, about the impact everything has on our atmosphere and on the increasing global temperature. We believe, that  by providing reliable information we can make  people start thinking about their action and decrease their carbon footprint (in process slow down global warming).\n\n#### FAQs\n\n[What is a carbon footprint?](/article/what-is-a-carbon-footprint)\n[Why is footprint measured in kg of CO2?](/article/why-is-footprint-measured-in-kg-of-co2)\n[How do we model footprints?](/article/how-do-we-model-footprints)",
                    meta: {
                        title: "About | Carbon Footprint",
                        meta: [
                            {
                                name: "description",
                                content: "We want to inform, as precisly as we can, about the impact everything has on our atmosphere and on the increasing global temperature. We believe, that  by providing reliable information we can make  people start thinking about their action and decrease their carbon footprint (in process slow down global warming)."
                            }, {
                                name: "keywords",
                                content: "carbon footprint, co2, atmosphere, footprint, environment, eco, ecology, emissions, human impact, global warming, sustainability, calculator, responsibility, earth"
                            }
                        ]
                    }
                },
                'help': {
                    title: 'Help',
                    body: "#### What is a model?\n\nModel is an approximation of a real world item's carbon footprint. Model can represent one part of item's [life-cycle](https://en.wikipedia.org/wiki/Life-cycle_assessment) (for example production, usage, disposal, ...) or it can represent the entire life-cycle of an item. That is called [cradle to grave](https://en.wikipedia.org/wiki/Life-cycle_assessment#Cradle-to-grave) model. Every model has to have at least on component. To compute the final carbon footprint we add carbon footpirnts for every component.\n\n> footprint = &sum; C<sub>i</sub>(x, z)\n\nModel also has metadata, such as name and description. To make models more dynamic, you can define inputs. Inputs are variables that change the final footprint. This makes models reusable. For example, a variable for a carbon footprint of a car ride could be distance. The father you drive, the more emissions you will generate.\n\n#### What is a component?\n\nComponent is is the smallest part of a model. Component contains schema and a metadata (component name). \n\n#### What is a schema?\n\nSchema is a mathematical representation of a component. Every schema can be transformed into a math equation. You can use constant numbers, input variables or other existing models in your schema.\n\n> S(a, b) = 0.5 &times; a &plus; M(b)",
                    meta: {
                        title: "Help | Carbon Footprint",
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
                },
                'what-is-a-carbon-footprint': {
                    title: 'What is a carbon footprint?',
                    body: "Carbon footprint is the amount of greenhouse gases, you released into the atmosphere. You are increasing your footprint by every activity you do. It may be by direct actions like car ride, cooking on a camp fire or using electricity generated from fosile fuels. Or it may be indirect action like buying things, eating, using delivery service.\n\n#### GHGs are biproduct of everything\n\nThink about today and think about all the things you did. I guess you brush your teeth in the morning. And you probably used a toothbrush and a toothpaste. All theese items had to be produced. And for production we had to use some materials and energy. The toothbrush and toothpaste had to be transported to the store so you could buy it. All of these actions released som GHG into the atmosphere. You did not created those grenhouse gases directly but by buying it, you took the responsibility for those greenhouse gases.\n\nIf you skiped your morning hygien, maybe you had a cup of coffee in the morning. Think about the origin of the coffee and the process for the coffee beans to get to your cup. Does it look like a lot of energy had to be spend? and did that energy come from renewable sources?\n\n#### Anxiety relief\n\nDon't worry. The point is not to stop living (or brushing our teeth), but to start living responsibly. It's good to know your carbon footprint so you can start reducing it efficiently. You can start by tackleing the thing with the biggest impact on your carbon footprint. So instead of giving up 20 things, you can give up 1 thing with the same impact. If giving up things is not possible, then looking for alternative ways of doing things, that are more environment friendly, may be the way for you. Everybody has to eat, we have to keep buying necessery items, so we cannot stop doing those things, but maybe there is more responsible way with lower emissions. It's very hard to live responsibly without suficient information. It actually may be discuraging or borderline imposible to reduce our carbon footprint without knowing the carbon price of our actions.\n\n#### Offseting does not solve the main issue\n\n Your carbon footprin can also be  reduced by doing something that actualy takes carbon from the atmosphere - offsetting. We could say that those actions provide negative carbon footprint. It's very good if you do offset your carbon footprint. However we want to motivate people to reduce their footprint by realizing that their action do harm the atmospehere and offseting does not solve the main issue. We simply put too much GHGs into our atmosphere.",
                    meta: {
                        title: "What is a carbon footprint? | Carbon Footprint",
                        meta: [
                            {
                                name: "description",
                                content: "Carbon footprint is the amount of greenhouse gases, you released into the atmosphere. You are increasing your footprint by every activity you do. It may be by direct actions like car ride, cooking on a camp fire or using electricity generated from fosile fuels. Or it may be indirect action like buying things, eating, using delivery service."
                            }, {
                                name: "keywords",
                                content: "carbon footprint, co2, atmosphere, footprint, environment, eco, ecology, emissions, human impact, global warming, sustainability, calculator, responsibility, earth, carbon, mathane, co2, n2o, ch4, f gases, greenhouse gasses, ghg, gwp"
                            }
                        ]
                    }
                },
                'why-is-footprint-measured-in-kg-of-co2': {
                    title: 'Why is footprint measured in kg of CO2?',
                    body: "CO<sub>2</sub> is the most iconic greenhouse gas molecule. When we talk about global warming we probably imagine burnig stuff. And the product of burning is CO<sub>2</sub>. Actualy, CO<sub>2</sub> is the largest contributor to the global warming. It's responsible for [almost 75%](https://ourworldindata.org/greenhouse-gas-emissions#by-gas-how-much-does-each-contribute-to-total-greenhouse-gas-emissions) of all GHG emissiions. But it's not the only greenhouse gas, in our atmosphere. [There are several molecules, that trap heat in our atmosphere](https://ourworldindata.org/greenhouse-gas-emissions).\n\n* CH<sub>4</sub> Methane\n\n* N<sub>2</sub>O Nitrous Oxide\n\n* F-gases\n\nDifferent molecules have different properties. Some molecules trap more heat some molecules live longer in our atmosphere. We have to create unified system to compare those GHGs, otherwise we won't be able to compare data accross different domains and make reasonable conclusons.\n\n#### CO<sub>2</sub> equivalent\n\nWe would like to introduce [CO<sub>2</sub>e (CO<sub>2</sub> equvalent)](https://en.wikipedia.org/wiki/Global_warming_potential) to you. It's a unit that represents emissions from all molecules in a form of CO<sub>2</sub>. It's like a currency. Every currency can be converted to other curencies with a conversion rate. This conversion rate tells us how much money we get for 1 unit of other currency (example: how many dollars we get for 1 euro). Simulary we can create conversion rates for GHG molecules and compute how many CO<sub>2</sub> molecules are equal to 1 other molecule (example 1 methane molecule is equal to [28 CO<sub>2</sub> molecules during 100 year period]((https://ourworldindata.org/greenhouse-gas-emissions#how-do-we-quantify-greenhouse-gas-emissions))). By converting all molecules to CO<sub>2</sub>e we can quantify emissions with one unit accross all domains. \n\n#### Caveats of conversion\n\n##### Time caveat\n\nThis was a very simplified explanation of the conversion process, that concentrated only on heat trapping ability of different molecules. But some molecules live longer in our atmosphere and the effect of a molecule that stays in our atmosphere for 100 years will be different then a molecule that stays for 10 years. Unit, that takes time into considerdion is called [GWP (global warming potential)](https://ourworldindata.org/greenhouse-gas-emissions#how-do-we-quantify-greenhouse-gas-emissions). This unit can be commputed for different time periods. For example if we want to know a molecule GWP for 20 year period we would talk about GWP<sub>20</sub>. If we want to talk about GWP for 100 year period we would use GWP<sub>100</sub>. We are able to create CO<sub>2</sub>e from GWP (it usualy is equal to GWP<sub>100</sub>).\n\n##### Misleading caveat\n\nSingle unit may suggest, that every GHG molecule differs only in the amount of trapped heat. But there are molecules (methane) that traps much more heat over much shorter period of time then CO<sub>2</sub>. That means, that even thou CO<sub>2</sub> is the largest contrubutor to global warming, decreasing methane emission may help us more in short term, becasue methane that is already in the atmosphere will naturaly dissapear faster. In the end, we have to keep in mind, that each molecule behaves differently and by converting emission into single number we may obscure other aspects of GHG molecules.\n\nWe don't want to suggest that we should prefer reducing one specific molecule. **We have to reduce every GHG molecule**. We just want to provide as much information to you as we can, so you can make well informed concluson for reduction of your carbon footpritn on our planet.",
                    meta: {
                        title: "Why is footprint measured in kg of CO2? | Carbon Footprint",
                        meta: [
                            {
                                name: "description",
                                content: "CO2 is the most iconic greenhouse gas molecule. When we talk about global warming we probably imagine burnig stuff. And the product of burning is CO2. Actualy, CO2 is the largest contributor to the global warming. It's responsible for almost 75% of all GHG emissiions. But it's not the only greenhouse gas, in our atmosphere. There are several molecules, that trap heat in our atmosphere."
                            }, {
                                name: "keywords",
                                content: "carbon footprint, co2, atmosphere, footprint, environment, eco, ecology, emissions, human impact, global warming, sustainability, calculator, responsibility, earth, carbon, mathane, co2, n2o, ch4, f gases, greenhouse gasses, ghg, gwp"
                            }
                        ]
                    }
                },
                'how-do-we-model-footprints': {
                    title: 'How do we model footprints?',
                    body: "Primary goal of every model is to show you the amount of CO<sub>2</sub> released into the atmosphere. To get to the final number we need mathematic operations and some source of data. Source of data should come from official streams like university research, enviromental organization research, statistical data, certified corporation data and so on. We try to avoid unreferenced data or suspicous data. If we have multiple sourcces for one model, we prefer pesimistic estimation. So we will probably choose data that results in larger carbon footprint.\n\n#### Devide and conquer\n\n When you try to create model of your own, you may get into a situation, where it seems like there is just too many variables. In this case, we suggest to use devide and conquer strategy. Try to split the model into smaller pieces and first try to model those smaller pieces. User interface is designed to help you apply this strategy. Smaller pieces, that make up the model are called components. Every model has to have at least one component. If you use more components, other users will see percentage of emissions for each component.\n\n#### Reusing other models\n\nDon't reinvent the wheel. If you know that there is already a model that you can use in your model, feel free to use it. If your model requires transportation, then you can use existing transport model for your model (transport by truck, rail, maritime, ...). Again, user interface is designed to help you. You can use another model by adding function in one of you components.\n\n#### Statistics\n\nIf you know that your model is composed out of multiple parts / components, but your data source provides only a final footprint value, use it. Primary goal, is to inform people about final carbon footprint, and this source will accomplish that. Components provide additional information about footprint, but this additional information isn't required.\n\n#### Description\n\nWrite as much information about your model as you can. Add data sources, inform about caveats or assumptions that were taken into account. Your models will be much more credible if you provide references to your sources and explain mathematics behind your model. Other people can easier suggest changes, if they understant your original intent.\n\nKeep in mind, that every footpirnt model is just an estimation. We cannot compute footprint for everything, because every single thing is slightly different. However, we can generalize or use statistics to model an average footprint for a group of things. There is a tradeof, if we make a model too general it may be very inaccurate for you (or region you live in). If we make a model too specific, we cannot apply this model to a lot of people.",
                    meta: {
                        title: "How do we model footprints? | Carbon Footprint",
                        meta: [
                            {
                                name: "description",
                                content: "Primary goal of every model is to show you the amount of CO2 released into the atmosphere. To get to the final number we need mathematic operations and some source of data. Source of data should come from official streams like university research, enviromental organization research, statistical data, certified corporation data and so on. We try to avoid unreferenced data or suspicous data. If we have multiple sourcces for one model, we prefer pesimistic estimation. So we will probably choose data that results in larger carbon footprint."
                            }, {
                                name: "keywords",
                                content: "carbon footprint, co2, atmosphere, footprint, environment, eco, ecology, emissions, human impact, global warming, sustainability, calculator, responsibility, earth, carbon, mathane, co2, n2o, ch4, f gases, greenhouse gasses, ghg, gwp"
                            }
                        ]
                    }
                }
            }
        }
    },
    metaInfo: function () {
        return this.article.meta
    },
    computed: {
        exists: function () {
            return this.article !== undefined
        },
        article: function () {
            return this.articles[this.slug]
        }
    }
}
</script>

<style></style>
