import Renderer from './aspheric/renderer.js'
import { fetchCategories } from './repos.js'
import { DataConfig, DataOrigin } from './aspheric/data.js'

(async function run() {

    const renderer = new Renderer(
        document.body.querySelector('#viewport'),
        new DataConfig({
            'categories':{
                type: DataOrigin.Http,
                endpoint: '/categories'
            },
            'services':{
                type: DataOrigin.Http,
                endpoint:'/services'
            }
        })
    )

    

    await renderer.refreshcategories()

    document.body.querySelectorAll('a')[1].click()

    await fetchCategories(renderer)
})()





