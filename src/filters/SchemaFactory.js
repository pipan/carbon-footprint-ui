export default class Schema {
    normalize(value) {
        if (value.type) {
            return value
        }
        let split = value.split(":")
        if (split.length === 1) {
            return {
                type: 'operation',
                value: value
            }
        }
        return {
            type: split[0],
            value: split[1]
        }
    }

    value(value) {
        if (this.normalize(value).type === 'function') {
            return this.normalize(value).model
        }
        return this.normalize(value).value
    }

    type(value) {
        return this.normalize(value).type
    }

    simplify(value) {
        if (value.type === 'operation') {
            return value.value
        }
        if (value.type !== 'component') {
            return value.type + ":" + value.value
        }
        return value
    }
}