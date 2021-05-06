export default function (value, limit = 120) {
    if (value.length < limit) {
        return value
    }
    return value.substr(0, limit) + "...";
}