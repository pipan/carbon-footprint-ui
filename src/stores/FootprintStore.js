export default function (modelFetch) {
    return {
        namespaced: true,
        state: () => {
            return {
                item: false,
                error: false,
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
                    map[input.reference] = input
                }
                return map
            }
        },
        mutations: {
            set: function (state, response) {
                state.item = response;
                state.error = false;
                state.loading = false;
            },
            loading: function (state) {
                state.item = false;
                state.error = false;
                state.loading = true;
            }
        },
        actions: {
            load: function (context, data) {
                context.commit('loading')
                return context.dispatch('refresh', data)
            },
            refresh: function (context, data) {
                return modelFetch.get(data.id, data.inputs)
                    .then((response) => {
                        if (response.ok) {
                            return response.json()
                        }
                        context.state.error = {
                            status: response.status
                        }
                        throw Error("http error")
                    })
                    .then(json => {
                        context.commit('set', json)
                    })
            }
        }
    }
}