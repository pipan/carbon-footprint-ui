export default class ToUnitFactory {
    store = null

    constructor(store) {
        this.store = store
    }

    getUnitById(unitId) {
        return this.store.getters['unit/map'][unitId]
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
        let best = {
            scale: scales[0],
            converted: value / scales[0].multiplier * scales[0].devider
        }
        
        for (let scale of scales) {
            const next = value / scale.multiplier;
            if (next < 1) {
                continue;
            }
            if (next > best.converted) {
                continue
            }
            if (next == best.converted && scale.priority <= best.scale.priority) {
                continue
            }

            best = {
                scale: scale,
                converted: next
            }
        }

        return {
            value: best.converted,
            label: {
                text: best.scale.label,
                id: best.scale.id
            },
            human: best.converted + " " + best.scale.label
        }
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