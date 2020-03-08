import { processPages } from "./pager.js"
import { processForms } from "./dal.js"
import { processTemplates } from "./templator.js"


export default class Renderer {

    constructor(viewport){
        const processors = []
        processors.push(processPages)
        processors.push(processForms)
        processors.push(processTemplates)

        this.processors = processors
        this.viewport = viewport
        this.state = {}
    }

    async insertHtml(content){
        this.viewport.innerHTML  = content
        
        await this.refresh()
    }

    async init(){
        await this.refresh()
    }

    async refresh(){
        for(const processor of this.processors){
            await processor(this)
        }
    }

    subscribeOn(dataCallbackName, callback){
        this.state[dataCallbackName] = callback
    }

    existSubscriberOn(name){
        return !!this.state[name]
    }

    push(name, data){
        
        this.state[name](data)
    }
}

