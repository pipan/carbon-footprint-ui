export default {
    namespaced: true,
    state: () => {
        return {
            items: [],
            pagination: {
                limit: 10,
                total: 0,
                page: 1,
            }
        }
    },
    mutations: {
        set: function (state, response) {
            state.items = response.items;
            state.pagination = {
                limit: response.limit,
                page: response.page,
                total: response.total
            }
        }
    },
    actions: {
        load: function (context, data) {


            const url = process.env.VUE_APP_API_HOST + "/api/search?query=" + encodeURI(data.query) + "&output=9" + "&page=" + encodeURI(data.page);
            fetch(url).then(response => response.json())
                .then(json => {
                    context.commit('set', json)
                })
        }
    }
}