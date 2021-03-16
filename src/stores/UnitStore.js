export default {
    namespaced: true,
    state: () => {
        return {
            items: [],
            loading: false
        }
    },
    getters: {
        map: function (state) {
            let map = {};
            for (let item of state.items) {
                map[item.id] = item
            }
            return map
        },
        scaleMap: function (state) {
            let map = {};
            for (let item of state.items) {
                for (let scale of item.scales) {
                    map[scale.id] = scale
                }
            }
            return map
        }
    },
    mutations: {
        set: function (state, items) {
            state.items = items;
            state.loading = false;
        }
    },
    actions: {
        load: function (context) {
            context.state.loading = true
            context.dispatch('refresh')
        },
        refresh: function (context) {
            const url = process.env.VUE_APP_API_HOST + "/api/unit";
            fetch(url).then(response => response.json())
                .then(json => {
                    context.commit('set', json)
                })
        }
    }
}