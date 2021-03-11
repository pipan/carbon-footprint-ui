import Vue from 'vue'

import App from './App.vue'
import router from './router'

import Unit from "./filters/Unit";

Vue.config.productionTip = false

Vue.filter('unit', Unit);

new Vue({
    router,
    data: {
        historyOriginIndex: window.history.length
    },
    render: h => h(App, {
        props: {}
    })
}).$mount('#app')