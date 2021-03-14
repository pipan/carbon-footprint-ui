import toUnit from "./ToUnit";

export default function (value, unit) {
    return toUnit(value, unit).human
}