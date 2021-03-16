export default class ToUnitFactory {
    store = null

    constructor(store) {
        this.store = store
    }

    getUnitById(unitId) {
        for (let unit of this.store.items) {
            if (unit.id === unitId) {
                return unit
            }
        }
        return null
    }

    filter(value, unitId) {
        let unit = this.getUnitById(unitId);
        if (!unit) {
            return {
                value: value,
                label: {},
                human: value
            };
        }

        let scales = unit.scales;
        let result = {
            value: value,
            label: {
                text: scales[0].label,
                id: scales[0].id
            },
            human: value
        };
        for (let scale of scales) {
            const next = value / scale.multiplier;
            if (next < 1) {
                break;
            }
            result.value = next;
            result.label = {
                text: scale.label,
                id: scale.id
            }
        }

        result.human = result.value + " " + result.label.text;
        return result
    }

    filterValue(value, unitId) {
        return this.filter(value, unitId).value
    }

    filterLabel(value, unitId) {
        return this.filter(value, unitId).label
    }

    filterLabelText(value, unitId) {
        return this.filter(value, unitId).label.text
    }

    filterLabelId(value, unitId) {
        return this.filter(value, unitId).label.id
    }

    filterHuman(value, unitId) {
        return this.filter(value, unitId).human
    }
}