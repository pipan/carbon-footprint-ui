import Vue from 'vue'
import VueRouter from 'vue-router'

import Index from '../views/Index.vue'
import Search from '../views/Search.vue'
import NotFound from '../views/NotFound.vue'
import Article from '../views/Article.vue'

Vue.use(VueRouter)

const routes = [
    {
        path: '',
        component: Index,
    },
    {
        path: '/search',
        component: Search,
    },
    {
        path: '/article/what-is-a-carbon-footprint',
        component: Article,
    },
    {
        path: '*',
        component: NotFound
    }
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

export default router
