import {initAjax} from './aspheric/dal.js'
import {processPages} from './aspheric/pager.js'
import Renderer from './aspheric/renderer.js'



(async function run (){
    const processors = []
    processors.push(processPages)
    const viewport = document.body.querySelector('#viewport')
    
    const renderer = new Renderer(processors, viewport)
    
    
    await processPages(renderer)
    
    document.body.querySelector('a').click()
})()





