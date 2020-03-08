

export default class Renderer {

    constructor(processors, viewport){
        this.processors = processors
        this.viewport = viewport
    }

    async insertHtml(content){
        this.viewport.innerHTML  = content
        
        for(const processor of this.processors){
            await processor(this)
        }
    }
}

