class ObjectMutator {
    constructor(source) {
        this.source = source
    }

    update(value) {
        if (typeof value === 'string') {
            return value
        }
        return Object.assign({}, this.source, value)
    }
}

class PropertyMutator {
    constructor(source, propertyName) {
        this.mutator = new ObjectMutator(source)
        this.propertyName = propertyName
    }

    update(value) {
        let mutatorValue = {};
        mutatorValue[this.propertyName] = value
        return this.mutator.update(mutatorValue)
    }
}

class ArrayMutator {
    constructor(source, property, index) {
        this.mutator = new PropertyMutator(source, property)
        this.source = source
        this.property = property
        this.index = index
    }

    update(value) {
        let clone = [...this.source[this.property]]
        clone[this.index] = value
        return this.mutator.update(clone)
    }
}

class ArrayPushMutator {
    constructor(source, property) {
        this.mutator = new PropertyMutator(source, property)
        this.source = source
        this.property = property
    }

    update(value) {
        let clone = []
        if (this.source[this.property]) {
            clone = [...this.source[this.property]]
        }
        
        clone.push(value)
        return this.mutator.update(clone)
    }
}

class ArrayRemoveMutator {
    constructor(source, property) {
        this.mutator = new PropertyMutator(source, property)
        this.source = source
        this.property = property
    }

    update(index) {
        if (!this.source[this.property]) {
            return this.mutator.update([])
        }

        let clone = [...this.source[this.property]]
        clone.splice(index, 1)
        return this.mutator.update(clone)
    }
}

export default class Mutator {
    constructor(source, parent) {
        this.source = source
        this.parent = parent
        this.mutator = new ObjectMutator(this.source)
    }

    static fromSource(source) {
        return new Mutator(source, null)
    }

    arrayItem(arrayName, index) {
        this.mutator = new ArrayMutator(this.source, arrayName, index)
        return new Mutator(this.source[arrayName][index], this)
    }

    property(name) {
        this.mutator = new PropertyMutator(this.source, name)
        return new Mutator(this.source[name], this)
    }

    arrayRemove(arrayName, index) {
        this.mutator = new ArrayRemoveMutator(this.source, arrayName)
        return this.updateAll(index)
    }

    push(arrayName, value) {
        this.mutator = new ArrayPushMutator(this.source, arrayName)
        return this.updateAll(value)
    }

    update(key, value) {
        return this.property(key).updateAll(value)
    }

    updateAll(data) {
        let updated = this.mutator.update(data)
        if (!this.parent) {
            return updated
        }
        return this.parent.updateAll(updated)
    }
}