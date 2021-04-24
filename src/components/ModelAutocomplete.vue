<template>
    <div class="column">
        <div class="row">
            <input class="input flex"
                placeholder="Find model"
                v-model="searchQuery"
                @input="search($event.target.value)"
                @keypress.enter.prevent
                v-app-autofocus="autofocus"/>
        </div>
        <div class="column gap-top--l" role="radiogroup" v-if="hasOptions">
            <radio-input 
                v-for="item of options"
                :key="item.id"
                :value="item"
                :selected="isSelected(item.id)"
                @select="select($event)">{{ item.name }}</radio-input>
        </div>
    </div>
</template>

<script>
import RadioInput from './RadioInput.vue'
import Debounce from '../lib/timing/Debounce'
export default {
    components: { RadioInput },
    name: 'ModelAutocomplete',
    props: {
        value: {
            type: [ Object, Number, String, Boolean ],
            default: null
        },
        autofocus: {
            type: Boolean,
            default: false
        }
    },
    data: function () {
        return {
            searchQuery: '',
            queryOptions: [],
            debounce: new Debounce(250)
        }
    },
    computed: {
        options: function () {
            if (this.value === null) {
                return this.queryOptions
            }

            let isValueInResult = false
            let result = []
            for (let item of this.queryOptions) {
                if (item.id === this.value.id) {
                    isValueInResult = true
                }
                result.push(item)
            }
            if (this.value && !isValueInResult) {
                result.splice(0, 0, this.value)
            }
            return result
        },
        hasOptions: function () {
            return this.options.length > 0
        }
    },
    methods: {
        isSelected: function (id) {
            if (this.value === null) {
                return false
            }
            return this.value.id === id
        },
        select: function (value) {
            if (value === this.value) {
                return
            }
            this.$emit('change', value)
        },
        search: function (query) {
            this.searchQuery = query
            this.debounce.next()
                .then(() => this.$services.api.search.filter(query, { page: 1 }))
                .then((response) => {
                    if (this.searchQuery !== query) {
                        throw Error("stale request data")
                    }
                    if (!response.ok) {
                        this.queryOptions = []
                        throw Error("invalid request")
                    }
                    return response.json()
                })
                .then((json) => {
                    this.queryOptions = json.items
                })
        }
    }
}
</script>

<style></style>
