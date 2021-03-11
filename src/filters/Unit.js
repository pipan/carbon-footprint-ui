export default function (value, unit) {
    let units = {
        length: {
            scale: [
                {
                    multiplier: 1,
                    treshhold: 10,
                    label: "mm"
                }, {
                    multiplier: 10,
                    treshhold: 100,
                    label: "cm"
                }, {
                    multiplier: 1000,
                    treshhold: 1000,
                    label: "m"
                }, {
                    multiplier: 1000000,
                    label: "km"
                }
            ]
        }
    };

    if (!units[unit]) {
        return value;
    }

    let result = {
        value: value,
        label: ""
    };
    let scale = units[unit].scale;
    for (let unit of scale) {
        result.value = value / unit.multiplier;
        result.label = unit.label;
        if (result.value < unit.treshhold) {
            break;
        }
    }

    return result.value + " " + result.label
}