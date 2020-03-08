import {processPages} from './aspheric/pager.js'
import Renderer from './aspheric/renderer.js'
import { processForms } from './aspheric/dal.js'



(async function run (){
    const processors = []
    processors.push(processPages)
    processors.push(processForms)

    const viewport = document.body.querySelector('#viewport')
    
    const renderer = new Renderer(processors, viewport)
    
    await processPages(renderer)
    
    document.body.querySelectorAll('a')[1].click()
})()





