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


