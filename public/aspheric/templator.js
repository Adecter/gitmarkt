
export async function setupDropdowns(renderer, pageName) {

    if (renderer.pager.isPageTracked(pageName)) {
        return
    }

    const pageContent = renderer.pager.get(pageName)
    const rawPage = renderer.document.createElement('div')
    rawPage.innerHTML = pageContent

    const selects = Array.from(rawPage.querySelectorAll('select[ph-data]'))

    for (const select of selects) {
        renderer.addAliveElem(select)
        const datakey = select.getAttribute('ph-data')

        renderer.dataconfig.subscribe(datakey, (dataRows) => {
            //TODO: Need way to customize every dropdown
            //TODO: Fix, this is not actually a leaf node
            renderDropdown(select, dataRows.filter(x=>!!x.ParentId).map(x => ({
                value: x.Id,
                text: x.Name
            })))

        })

    }

    renderer.pager.savePage(pageName, rawPage.innerHTML)
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

export function renderDropdown(dropdown, options) {
    dropdown.innerHTML = ''

    for (const option of options) {
        const optElem = document.createElement('option')
        optElem.setAttribute('value', option.value)
        optElem.innerText = option.text
        dropdown.appendChild(optElem)
    }
}