import Vue from 'vue'
import Vuex from 'vuex'
import VueMeta from 'vue-meta'

import * as Sentry from "@sentry/vue";

import ModelFetch from './api/ModelFetch'

import App from './App.vue'
import router from './router'

import unitStore from './stores/UnitStore'
import searchStore from './stores/SearchStore'
import footprintStoreFactory from './stores/FootprintStore'
import draftStoreFactory from './stores/DraftStore'

import ellipsis from "./filters/Ellipsis"
import markdownParagraph from "./filters/MarkdownParagraph"
import precision from "./filters/Precision"
import titleCase from "./filters/TitleCase"
import UnitFactory from "./filters/UnitFactory"
import SchemaFactory from "./filters/SchemaFactory"

import HistoryService from './services/HistoryService'
import TitleService from './services/TitleService'
import DraftService from './services/DraftService'

import AppLink from './components/AppLink.vue'
import SearchFetch from './api/SearchFetch'
import Autofocus from './directives/Autofocus'
import './registerServiceWorker'

Vue.use(Vuex)
Vue.use(VueMeta)

let api = {
    model: new ModelFetch(),
    search: new SearchFetch()
}

let store = new Vuex.Store({
    modules: {
        unit: unitStore,
        search: searchStore,
        footprint: footprintStoreFactory(api.model),
        draft: draftStoreFactory(api.model)
    }
});

Vue.prototype.$services = {
    history: new HistoryService(router),
    title: new TitleService(),
    draft: new DraftService(store),
    api: api
};

Vue.component('app-link', AppLink)
Vue.directive('app-autofocus', Autofocus)
Vue.config.productionTip = false

let unitFactory = new UnitFactory(store)
Vue.filter('toUnit', unitFactory.filter.bind(unitFactory));
Vue.filter('unitLabel', unitFactory.filterLabel.bind(unitFactory));
Vue.filter('unitLabelText', unitFactory.filterLabelText.bind(unitFactory));
Vue.filter('unitLabelId', unitFactory.filterLabelId.bind(unitFactory));
Vue.filter('unitValue', unitFactory.filterValue.bind(unitFactory));
Vue.filter('unitHuman', unitFactory.filterHuman.bind(unitFactory));
Vue.filter('ellipsis', ellipsis);
Vue.filter('markdownParagraph', markdownParagraph);
Vue.filter('precision', precision);
Vue.filter('titleCase', titleCase);
let schemaFactory = new SchemaFactory()
Vue.filter('schemaNormalize', schemaFactory.normalize.bind(schemaFactory));
Vue.filter('schemaValue', schemaFactory.value.bind(schemaFactory));
Vue.filter('schemaType', schemaFactory.type.bind(schemaFactory));
Vue.filter('schemaSimplify', schemaFactory.simplify.bind(schemaFactory));

if (process.env.VUE_APP_SENTRY_DSN) {
    Sentry.init({
        Vue,
        dsn: process.env.VUE_APP_SENTRY_DSN,
        environment: process.env.VUE_APP_SENTRY_ENVIRONMENT
    });
}

new Vue({
    router: router,
    store: store,
    render: h => h(App, {
        props: {}
    })
}).$mount('#app')