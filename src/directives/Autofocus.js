
export default {
    inserted: function (el, binding) {
        if (!binding.value) {
            return
        }
        el.focus()
    }
}