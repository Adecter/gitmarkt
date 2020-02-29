

class Renderer {


    constructor(processors, viewport){
        this.processors = processors
        this.viewport = viewport
    }



    insertHtml(content, elem = this.viewport){
        elem.insertHtml = content

        this.processors.array.forEach(process => {
            process(elem)
        });
    }
}

