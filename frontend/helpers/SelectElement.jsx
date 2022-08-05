export default function SelectElement(e, elementClasses) {
    let el = e.target;
    let res = null;
    while (el.tagName !== 'HTML' && res === null) {
        for (let i = 0; i < elementClasses.length && res === null; ++i) {
            res = el.classList.contains(elementClasses[i]) ? el : null;
        }
        el = el.parentNode;
    }
    return res;
}
