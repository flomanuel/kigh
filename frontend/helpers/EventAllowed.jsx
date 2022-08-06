export default function EventAllowed(e, excludedElementClass) {
    let el = e.target;
    let res = true;
    while (el && el.tagName !== 'HTML' && res) {
        for (let i = 0; i < excludedElementClass.length && res; ++i) {
            res = !el.classList.contains(excludedElementClass[i]);
        }
        el = el.parentNode;
    }
    return res;
}
