export default function EventAllowed(e, excludedElementClass) {
    let el = e.target;
    let res = true;
    while (el.tagName !== 'HTML' && res) {
        console.log(el);
        res = !el.classList.contains(excludedElementClass);
        el = el.parentNode;
    }
    return res;
}
