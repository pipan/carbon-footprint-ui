export default {
    namespaced: true,
    state: () => {
        return {
            updating: false
          }
    },
    mutations: {
        startUpdating: function(state) {
            state.updating = true
        }
    },
    actions: {
        updateStart: function(context) {
            context.commit('startUpdating')
        }
    }
}
