import Vue from 'vue'
import Vuex from 'vuex'

import App from './App.vue'
import router from './router'

import unitStore from './stores/UnitStore'
import searchStore from './stores/SearchStore'
import footprintStore from './stores/FootprintStore'

import ellipsis from "./filters/Ellipsis"
import precision from "./filters/Precision"
import titleCase from "./filters/TitleCase"
import UnitFactory from "./filters/UnitFactory"

import HistoryService from './services/HistoryService'
import TitleService from './services/TitleService'

import AppLink from './components/AppLink.vue'

Vue.prototype.$services = {
    history: new HistoryService(router),
    title: new TitleService()
};
Vue.component('app-link', AppLink)
Vue.use(Vuex)
Vue.config.productionTip = false
let store = new Vuex.Store({
    modules: {
        unit: unitStore,
        search: searchStore,
        footprint: footprintStore
    }
});
let unitFactory = new UnitFactory(store.state.unit)

Vue.filter('toUnit', unitFactory.filter.bind(unitFactory));
Vue.filter('unitLabel', unitFactory.filterLabel.bind(unitFactory));
Vue.filter('unitLabelText', unitFactory.filterLabelText.bind(unitFactory));
Vue.filter('unitLabelId', unitFactory.filterLabelId.bind(unitFactory));
Vue.filter('unitValue', unitFactory.filterValue.bind(unitFactory));
Vue.filter('unitHuman', unitFactory.filterHuman.bind(unitFactory));
Vue.filter('ellipsis', ellipsis);
Vue.filter('precision', precision);
Vue.filter('titleCase', titleCase);

new Vue({
    router: router,
    store: store,
    render: h => h(App, {
        props: {}
    })
}).$mount('#app')