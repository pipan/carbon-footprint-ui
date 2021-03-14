import Vue from 'vue'
import Vuex from 'vuex'

import App from './App.vue'
import router from './router'

import unitStore from './stores/UnitStore';
import searchStore from './stores/SearchStore';

import Unit from "./filters/Unit";
import HistoryService from './services/HistoryService';

Vue.prototype.$services = {
    history: new HistoryService(router)
};
Vue.use(Vuex)
Vue.config.productionTip = false

Vue.filter('unit', Unit);

new Vue({
    router: router,
    store: new Vuex.Store({
        modules: {
            unit: unitStore,
            search: searchStore
        }
    }),
    render: h => h(App, {
        props: {}
    })
}).$mount('#app')