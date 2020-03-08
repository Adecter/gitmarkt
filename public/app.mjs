import Renderer from './aspheric/renderer.js'
import { fetchCategories } from './repos.js'

(async function run() {

    const renderer = new Renderer(
        document.body.querySelector('#viewport')
    )

    await renderer.init()

    document.body.querySelectorAll('a')[1].click()

    await fetchCategories(renderer)
})()





