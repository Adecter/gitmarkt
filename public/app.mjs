import Renderer from './aspheric/renderer.js'
import { DataConfig, DataOrigin } from './aspheric/data.js'
import { Pager } from './aspheric/pager.js'

//TODO: investigate this hack
(async function run() {
    
    const renderer = new Renderer(
        new DataConfig({
            'categories':{
                type: DataOrigin.Http,
                endpoint: '/categories'
            },
            // 'services':{
            //     type: DataOrigin.Http,
            //     endpoint:'/services'
            // }
        }),
        new Pager(['register.html', 'search.html', 'category.html', 'menu.html']),
        document)

    renderer.bootstrap()
})()





