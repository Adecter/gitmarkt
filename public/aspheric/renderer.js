import { processPages } from "./pager.js"
import { processForms } from "./dal.js"
import { trackNewDynamicElements } from "./templator.js"


export default class Renderer {

    constructor(viewport, dataconfig) {
        const processors = []
        processors.push(processPages)
        processors.push(processForms)
        processors.push(trackNewDynamicElements)

        this.processors = processors
        this.viewport = viewport
        this.dataconfig = dataconfig
        this.aliveObjects = {}
    }

    addDynamicElem(elem) {
        
    }

    async insertHtml(content) {
        this.viewport.innerHTML = content

        await this.refresh()
    }

    async refresh() {
        for (const processor of this.processors) {
            await processor(this)
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


    static renderDropdown(dropdown, options) {

        for (const option of options) {
            const optElem = document.createElement('option')
            optElem.setAttribute('value', option.value)
            optElem.innerText = option.text
            dropdown.appendChild(optElem)
        }

        return dropdown
    }
}

