export default function (value, precision) {
    if (!value) {
        return value;
    }
    return value.toFixed(precision);
}