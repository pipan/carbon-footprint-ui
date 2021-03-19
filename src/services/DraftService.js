import CreateBehavior from "./behaviors/CreateBehavior"
import UpdateBehavior from "./behaviors/UpdateBehavior"

export default class DraftService {
    behaviors = {}

    constructor(store) {
        this.behaviors = {
            new: new CreateBehavior(store),
            default: new UpdateBehavior(store)
        }
    }

    getBehavior(id) {
        if (!this.behaviors[id]) {
            return this.behaviors.default
        }
        return this.behaviors[id]
    }

    load(id) {
        return this.getBehavior(id).load(id)
    }

    save(id) {
        return this.getBehavior(id).save(id)
    }
}