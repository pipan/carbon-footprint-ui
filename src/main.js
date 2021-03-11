import Vue from 'vue'

import App from './App.vue'
import router from './router'

import Unit from "./filters/Unit";
import HistoryStore from './stores/HistoryStore';

Vue.config.productionTip = false

Vue.filter('unit', Unit);

new Vue({
    router,
    data: {
        stores: {
            history: new HistoryStore(router)
        }
    },
    render: h => h(App, {
        props: {}
    })
}).$mount('#app')