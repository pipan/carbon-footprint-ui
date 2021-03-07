import Vue from 'vue'
import VueRouter from 'vue-router'

import Index from '../views/Index.vue'
import Search from '../views/Search.vue'
import NotFound from '../views/NotFound.vue'
import Article from '../views/Article.vue'
import Footprint from '../views/Footprint.vue'
import FootprintUpdate from '../views/FootprintUpdate.vue'

import CreateFootprint from '../views/modals/CreateFootprint.vue'
import NameEdit from '../views/modals/NameEdit.vue'
import TypeEdit from '../views/modals/TypeEdit.vue'

Vue.use(VueRouter)

const routes = [
    {
        path: '',
        component: Index,
    },
    {
        path: '/create',
        components: {
            default: Index,
            modal: CreateFootprint
        },
    },
    {
        path: '/search',
        component: Search,
        props: function (route) {
            return {
                query: route.query.q
            }
        }
    },
    {
        path: '/search/create',
        components: {
            default: Search,
            modal: CreateFootprint
        },
    },
    {
        path: '/footprint/:id',
        component: Footprint,
    },
    {
        path: '/footprint/:id/update',
        component: FootprintUpdate,
    },
    {
        path: '/footprint/:id/update/name',
        components: {
            default: FootprintUpdate,
            modal: NameEdit
        },
    },
    {
        path: '/footprint/:id/update/type',
        components: {
            default: FootprintUpdate,
            modal: TypeEdit
        },
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
