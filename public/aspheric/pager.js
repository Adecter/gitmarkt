
export class Pager {

    constructor(pageNames){
        this.pageNames = pageNames
        this.pages = {}
        this.trackedPages = {}
    }

    //TODO: Maybe use When.All?
    async pullPages(){

        this.pages['container.html'] = await (
            await fetch('container.html')).text()

        for(const name of this.pageNames){
            this.pages[name] = await (await fetch(name)).text()
        }
    }

    isPageTracked(pageName){
        return !!this.trackedPages[pageName]
    }

    get(pageName){
        const content = this.pages[pageName]
        if(!content){
            throw new Error('No such page with name '+pageName)
        }
        return content
    }

    savePage(pageName, content){
        this.pages[pageName] = content
    }

    trackPage(pageName){
        this.trackedPages[pageName]=true
    }
}

export function setupNavigationOn(renderer, pageName) {
    //TODO: This logic needs to be shared between processors
    if(renderer.pager.isPageTracked(pageName)){
        return 
    }

    const pageContent = renderer.pager.get(pageName)
    const rawPage = renderer.document.createElement('div')
    rawPage.innerHTML = pageContent

    const links = Array.from(rawPage.querySelectorAll('a[ph-href]'))

    for(const link of links){
        renderer.addAliveElem(link)

        link.onclick = async (e) => {
            
            e.preventDefault()
            await renderer.render(link.getAttribute('ph-href'))
        }
    }

    renderer.pager.savePage(pageName, rawPage.innerHTML)

}


