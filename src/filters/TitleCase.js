export default function (value) {
    if (!value) {
        return value;
    }
    let titleCase = "";
    let toUpper = true;
    for (let i = 0; i < value.length; i++) {
        if (value[i] === " ") {
            toUpper = true;
        }
        if (toUpper) {
            titleCase += value[i].toUpperCase();
        } else {
            titleCase += value[i];
        }
        toUpper = false;
    }
    return titleCase;
}