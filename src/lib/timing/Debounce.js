export default class Debounce {
    constructor(delay) {
        this.delay = delay
        this.id = 0
    }

    next() {
        this.id += 1
        return this.trigger(this.id)
    }

    trigger(id) {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                if (this.id !== id) {
                    reject("Debounce")
                }
                resolve(true)
            }, this.delay)
        })
    }
}