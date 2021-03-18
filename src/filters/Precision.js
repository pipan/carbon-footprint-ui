export default function (value, precision) {
    if (!value) {
        return value;
    }
    if ((Math.round(value) - value)=== 0) {
        return value;
    }
    return value.toFixed(precision);
}