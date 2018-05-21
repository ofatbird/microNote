const body = document.body
export default function getOffsetTop(element, stop) {
    const finalElement =  stop || body
    let offsetTop = element.offsetTop
    let parent = element.offsetParent
    console.log(element)
    while ( parent!== finalElement) {
        offsetTop += parent.offsetTop
        parent = parent.offsetParent
    }
    return offsetTop
}