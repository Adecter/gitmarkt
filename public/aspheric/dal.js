

export function setupFormsOn(renderer, pageName) {

    if (renderer.pager.isPageTracked(pageName)) {
        return
    }

    const pageContent = renderer.pager.get(pageName)
    const rawPage = renderer.document.createElement('div')
    rawPage.innerHTML = pageContent

    const submits = Array.from(rawPage.querySelectorAll('form[ph-data] button[type="submit"]'))

    
    for (const submit of submits) {
        renderer.addAliveElem(submit)
        const datakey = submit.form.getAttribute('ph-data')

        submit.onclick = async (e) => {
        
            e.preventDefault()   
            await renderer.dataconfig.push(
                datakey, new FormData(e.target.form)
            )
        }
    }

    renderer.pager.savePage(pageName, rawPage.innerHTML)

}