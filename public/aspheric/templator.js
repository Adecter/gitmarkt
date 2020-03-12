import { getDynamicDropdowns } from "./selectors.js";

export async function trackNewDynamicElements(renderer) {


    //Process dropdowns
    const dropDowns = getDynamicDropdowns(document.body)
    const allDynamicElements = []

    allDynamicElements.concat(dropDowns)

    for (const elem of allDynamicElements) {

        const id = elem.id

        if (id !== '') {
            continue;
        }

        renderer.addDynamicElem(elem)
    }
}

export function insertComponents(renderer, pageName) {

    if (renderer.pager.isPageTracked(pageName)) {
        return
    }

    const pageContent = renderer.pager.get(pageName)
    const rawPage = renderer.document.createElement('div')
    rawPage.innerHTML = pageContent

    const placeholders = Array.from(rawPage.querySelectorAll('[ph-put]'))
    
    for (const placeholder of placeholders) {
        const content = renderer.pager.get(placeholder.getAttribute('ph-put'))
        placeholder.innerHTML = content
        unWrapElement(placeholder)
    }

    renderer.pager.savePage(pageName, rawPage.innerHTML)
}


function unWrapElement(el) {
    var parent = el.parentNode;
    while (el.firstChild) parent.insertBefore(el.firstChild, el);
    parent.removeChild(el);
}