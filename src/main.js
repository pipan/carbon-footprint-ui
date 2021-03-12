import Vue from 'vue'

import App from './App.vue'
import router from './router'

import Unit from "./filters/Unit";
import HistoryService from './services/HistoryService';

Vue.prototype.$services = {
    history: new HistoryService(router)
};
Vue.config.productionTip = false

Vue.filter('unit', Unit);

new Vue({
    router,
    render: h => h(App, {
        props: {}
    })
}).$mount('#app')