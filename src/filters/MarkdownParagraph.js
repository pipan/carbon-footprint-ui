export default function (value) {
    let paragraphs = value.split("\n\n")
    return paragraphs[0]
}