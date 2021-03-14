export default {
    namespaced: true,
    state: () => {
        return {
            items: []
        }
    },
    mutations: {
        set: function (state, items) {
            state.items = items;
        }
    },
    actions: {
        load: function (context) {
            const url = process.env.VUE_APP_API_HOST + "/api/unit";
            fetch(url).then(response => response.json())
                .then(json => {
                    context.commit('set', json)
                })
        }
    }
}