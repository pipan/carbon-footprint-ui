export default {
    namespaced: true,
    state: () => {
        return {
            item: false,
            loading: false
        }
    },
    getters: {
        inputMap: function (state) {
            if (!state.item) {
                return {};
            }
            let map = {}
            for (const input of state.item.inputs) {
                map[input.id] = input
            }
            return map
        }
    },
    mutations: {
        set: function (state, response) {
            state.item = response;
            state.loading = false;
        },
        loading: function (state) {
            state.item = false;
            state.loading = true;
        }
    },
    actions: {
        load: function (context, data) {
            context.commit('loading')
            context.dispatch('refresh', data)
        },
        refresh: function (context, data) {
            let query = [];
            if (data.inputs) {
                for (let key in data.inputs) {
                    query.push(key + "=" + encodeURI(data.inputs[key]))
                }
            }

            let queryString = query.join("&");
            if (queryString.length > 0) {
                queryString = "?" + queryString
            }
            
            const url = process.env.VUE_APP_API_HOST + "/api/model/" + encodeURI(data.id) + queryString

            fetch(url).then(response => response.json())
                .then(json => {
                    context.commit('set', json)
                })
        }
    }
}