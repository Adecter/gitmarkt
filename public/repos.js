

export async function fetchCategories(renderer){
    const response = (await fetch('categories')).text()
    const categories = JSON.parse((await response)).filter(x=>!!x.ParentId).map(x=>({
        value: x.Id,
        text: x.Name
    }))

    renderer.push('categories',categories)
}