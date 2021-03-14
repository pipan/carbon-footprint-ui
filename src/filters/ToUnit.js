export default function (value, unit) {
    let units = {
        length: {
            scale: [
                {
                    multiplier: 1,
                    label: "mm"
                }, {
                    multiplier: 10,
                    label: "cm"
                }, {
                    multiplier: 1000,
                    label: "m"
                }, {
                    multiplier: 1000000,
                    label: "km"
                }
            ]
        },
        weight: {
            scale: [
                {
                    multiplier: 1,
                    label: "mg"
                }, {
                    multiplier: 1000,
                    label: "g"
                }, {
                    multiplier: 1000000,
                    label: "kg"
                }, {
                    multiplier: 1000000000,
                    label: "t"
                }
            ]
        }
    };

    if (!units[unit]) {
        return {
            value: value,
            label: '',
            human: value
        };
    }

    let scale = units[unit].scale;
    let result = {
        value: value,
        label: scale[0].label,
        human: value
    };
    for (let unit of scale) {
        const next = value / unit.multiplier;
        if (next < 1) {
            break;
        }
        result.value = next;
        result.label = unit.label;
    }

    result.human = result.value + " " + result.label;
    return result
}