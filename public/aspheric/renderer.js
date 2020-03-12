import { setupNavigationOn } from "./pager.js"
import { setupFormsOn } from "./dal.js"
import { insertComponents, setupDropdowns } from "./templator.js"


export default class Renderer {

    constructor(dataconfig, pager, document) {

        this.dataconfig = dataconfig
        this.pager = pager
        this.document = document
        
        this.markedPages = {}
        this.aliveObjects = {}
    }

    async bootstrap(){
        await this.pager.pullPages()
        await this.dataconfig.init()

        const mainDiv = this.document.createElement('div')
        this.document.body.appendChild(mainDiv)

        this.render('container.html', mainDiv)
    }

    addAliveElem(elem) {
        const id = Renderer.uuidv4()
        elem.setAttribute('ph-id',id)
        this.aliveObjects[id] = elem
    }

    async insertHtml(content) {
        this.viewport.innerHTML = content
        await this.refresh()
    }

    async render(pageName, screen) {
        insertComponents(this, pageName)
        setupNavigationOn(this, pageName)
        setupFormsOn(this, pageName)
        setupDropdowns(this, pageName)
        
        this.loadAliveObjects(pageName,screen)
        this.pager.trackPage(pageName)
    }

    loadAliveObjects(pageName,screen){
        if(!screen){
            
            screen = this.document.querySelector('[ph-screen]')
        }

        screen.innerHTML = this.pager.get(pageName)

        const objects = Array.from(screen.querySelectorAll('[ph-id]'))

        for(const obj of objects){
            const id = obj.getAttribute('ph-id')
            const aliveElem = this.aliveObjects[id]
            obj.parentNode.replaceChild(aliveElem, obj);
        }
    }

    //TODO: Eliminate this ugly workaround
    subscribeOnOrMutate(dataCallbackName, callback) {
        if (!!this.domMutators[dataCallbackName]) {
            this.domMutators[dataCallbackName](this.cache[dataCallbackName])
            return
        }
        this.domMutators[dataCallbackName] = callback
    }

    cacheAndPush(name, data) {
        this.cache[name] = data
        this.domMutators[name](data)
    }

    static uuidv4() {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
            var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        });
    }

    log(){
        console.log(this.aliveObjects)
        console.log(this.markedPages)
    }
}

