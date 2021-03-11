import Vue from 'vue'
import VueRouter from 'vue-router'

import SearchLayout from '../views/layouts/SearchLayout.vue'

import Index from '../views/Index.vue'
import Search from '../views/Search.vue'
import NotFound from '../views/NotFound.vue'
import Article from '../views/Article.vue'
import Footprint from '../views/Footprint.vue'
import FootprintUpdate from '../views/FootprintUpdate.vue'

import NameEdit from '../views/modals/NameEdit.vue'
import TypeEdit from '../views/modals/TypeEdit.vue'
import FootprintModal from '../views/modals/FootprintModal.vue'
import FootprintInput from '../views/modals/FootprintInput.vue'

Vue.use(VueRouter)

const routes = [
    {
        path: '',
        component: SearchLayout,
        props: function (route) {
            return {
                query: route.query.q
            }
        },
        children: [
            {
                path: '',
                name: 'index',
                component: Index
            },
            {
                path: 'search',
                name: 'search',
                component: Search,
                props: function (route) {
                    return {
                        query: route.query.q
                    }
                },
            }
        ]
    },
    {
        path: '/create',
        name: 'footprint.create',
        component: FootprintUpdate
    },
    {
        path: '/footprint/:id',
        name: 'footprint',
        component: Footprint,
        props: true
    },
    {
        path: '/footprint/:id/input/:inputId',
        components: {
            default: Footprint,
            modal: FootprintInput
        },
        props: {
            default: true,
            modal: true
        }
    },
    {
        path: '/footprint/:id/component/:componentId',
        name: 'footprint.component',
        components: {
            default: Footprint,
            modal: FootprintModal
        },
        props: {
            default: true,
            modal: true
        }
    },
    {
        path: '/footprint/:id/update',
        name: 'footprint.update',
        component: FootprintUpdate,
        props: true
    },
    {
        path: '/footprint/:id/update/name',
        components: {
            default: FootprintUpdate,
            modal: NameEdit
        },
        props: true
    },
    {
        path: '/footprint/:id/update/type',
        components: {
            default: FootprintUpdate,
            modal: TypeEdit
        },
        props: true
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
