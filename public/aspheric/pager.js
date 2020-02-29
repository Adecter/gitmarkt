function loadPages(pages) {



}


export async function processPages() {
    const hrefToHtml = {}
    const defaultViewport = document.body.querySelector('#viewport')

    const links = Array.from(document.body.querySelectorAll('a'))
    const hrefs = links.map(x => x.href)

    hrefs.forEach(async x => { 
        const content = (await fetch(x)).text() 
        hrefToHtml[x] = await content
        
    })
    
    //await Promise.all(pagesPromises)
    // debugger
    links.forEach(x => {
        x.addEventListener('click', (elem) => {
            event.preventDefault()
            // debugger
            defaultViewport.innerHTML = hrefToHtml[elem.target.href]
        })
    });

}