import { getLinksWithoutListeners } from "./selectors.js"



export async function processPages(renderer) {
    
    const links = getLinksWithoutListeners(document.body)
    const hrefs = links.map(x => x.href)

    const hrefToHtml = {}

    for(const href of hrefs){
        const content = (await fetch(href)).text() 
        hrefToHtml[href] = await content
    }

    for(const link of links){
        link.onclick = async (e) => {
            e.preventDefault()
            await renderer.insertHtml(hrefToHtml[e.target.href])
        }
    }

}


