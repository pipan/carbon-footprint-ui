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
import DescriptionEdit from '../views/DescriptionEdit.vue'
import ModelEdit from '../views/ModelEdit.vue'
import ComponentNameEdit from '../views/modals/ComponentNameEdit.vue'
import SchemaCreate from '../views/modals/SchemaCreate.vue'
import SchemaUpdate from '../views/modals/SchemaUpdate.vue'
import ComponentEdit from '../views/ComponentEdit.vue'
import InputEdit from '../views/modals/InputEdit.vue'
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
                        query: route.query.q,
                        page: parseInt(route.query.p),
                    }
                },
            }
        ]
    },
    {
        path: '/create',
        name: 'footprint.create',
        redirect: {
            name: 'footprint.write',
            params: {
                id: 'new'
            }
        }
    },
    {
        path: '/write/:id',
        name: 'footprint.write',
        component: FootprintUpdate,
        props: true
    },
    {
        path: '/write/:id/name',
        name: 'footprint.write.name',
        components: {
            default: FootprintUpdate,
            modal: NameEdit
        },
        props: {
            default: true,
            modal: true
        }
    },
    {
        path: '/write/:id/type',
        name: 'footprint.write.type',
        components: {
            default: FootprintUpdate,
            modal: TypeEdit
        },
        props: {
            default: true,
            modal: true
        }
    },
    {
        path: '/write/:id/description',
        name: 'footprint.write.description',
        component: DescriptionEdit,
        props: true
    },
    {
        path: '/write/:id/model',
        name: 'footprint.write.model',
        component: ModelEdit,
        props: true
    },
    {
        path: '/write/:id/model/component/:index',
        name: 'footprint.write.component',
        component: ComponentEdit,
        props: true
    },
    {
        path: '/write/:id/model/component/:index/name',
        name: 'footprint.write.component.name',
        components: {
            default: ComponentEdit,
            modal: ComponentNameEdit
        },
        props: {
            default: true,
            modal: true
        }
    },
    {
        path: '/write/:id/model/component/:index/schema/new/:type',
        name: 'footprint.write.schema.create',
        components: {
            default: ComponentEdit,
            modal: SchemaCreate
        },
        props: {
            default: true,
            modal: true
        }
    },
    {
        path: '/write/:id/model/component/:index/schema/:schemaIndex/:type',
        name: 'footprint.write.schema',
        components: {
            default: ComponentEdit,
            modal: SchemaUpdate
        },
        props: {
            default: true,
            modal: true
        }
    },
    {
        path: '/write/:id/model/input/:inputId',
        name: 'footprint.write.input',
        components: {
            default: ModelEdit,
            modal: InputEdit
        },
        props: {
            default: true,
            modal: true
        }
    },
    {
        path: '/footprint/:id',
        name: 'footprint',
        component: Footprint,
        props: true
    },
    {
        path: '/footprint/:id/input/:inputId',
        name: 'footprint.input',
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
