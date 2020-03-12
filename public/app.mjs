import Renderer from './aspheric/renderer.js'
import { DataConfig, DataOrigin, DataModes } from './aspheric/data.js'
import { Pager } from './aspheric/pager.js'

//TODO: investigate this hack
(async function run() {
    
    const renderer = new Renderer(
        new DataConfig({
            'categories':{
                type: DataOrigin.Http,
                endpoint: '/categories',
                mode: DataModes.ReadWrite
            },
            'services':{
                type: DataOrigin.Http,
                endpoint:'/services',
                mode: DataModes.Write
            }
        }),
        new Pager(['register.html', 'search.html', 'category.html', 'menu.html']),
        document)

    renderer.bootstrap()
})()





