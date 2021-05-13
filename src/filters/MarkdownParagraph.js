export default function (value) {
    if (!value) {
        return ""
    }
    let paragraphs = value.split("\n\n")
    return paragraphs[0]
}