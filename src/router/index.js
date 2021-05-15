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
import DescriptionPreview from '../views/DescriptionPreview.vue'
import ModelEdit from '../views/ModelEdit.vue'
import ComponentNameEdit from '../views/modals/ComponentNameEdit.vue'
import SchemaCreate from '../views/modals/SchemaCreate.vue'
import SchemaUpdate from '../views/modals/SchemaUpdate.vue'
import ComponentReferenceEdit from '../views/componentedit/ComponentReferenceEdit.vue'
import InputEdit from '../views/modals/InputEdit.vue'
// import FootprintModal from '../views/modals/FootprintModal.vue'
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
        path: '/footprint/:id',
        name: 'footprint',
        component: Footprint,
        props: true
    },
    {
        path: '/footprint/:id/input/:inputReference',
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
        path: '/article/:slug',
        name: 'article',
        component: Article,
        props: true
    },
    // {
    //     path: 'footprint/:id/component/:componentId',
    //     name: 'footprint.component',
    //     components: {
    //         default: Footprint,
    //         modal: FootprintModal
    //     },
    //     props: {
    //         default: true,
    //         modal: true
    //     }
    // },
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
        path: '/write/:id/description/preview',
        name: 'footprint.write.description.preview',
        component: DescriptionPreview,
        props: true
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
        path: '/write/:id/model/component/:componentId/:reference',
        name: 'footprint.write.component.reference',
        component: ComponentReferenceEdit,
        props: true
    },
    {
        path: '/write/:id/model/component/:componentId/:reference/name',
        name: 'footprint.write.component.name',
        components: {
            default: ComponentReferenceEdit,
            modal: ComponentNameEdit
        },
        props: {
            default: true,
            modal: true
        }
    },
    {
        path: '/write/:id/model/component/:componentId/:reference/item/:itemReference',
        name: 'footprint.write.schema',
        components: {
            default: ComponentReferenceEdit,
            modal: SchemaUpdate
        },
        props: {
            default: true,
            modal: true
        }
    },
    {
        path: '/write/:id/model/component/:componentId/:reference/item/new/:type',
        name: 'footprint.write.schema.create',
        components: {
            default: ComponentReferenceEdit,
            modal: SchemaCreate
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
