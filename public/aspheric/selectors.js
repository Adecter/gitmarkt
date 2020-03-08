export function getLinksWithoutListeners(elem){
    return Array.from(elem.querySelectorAll('a')).filter(x=>!!!x.onclick)
}

export function getFormsWithoutListeners(elem){
    return Array.from(
        elem.querySelectorAll('form button[type="submit"')).filter(x=>!!!x.onclick)
        
}

export function getDynamicDropdowns(elem){
    return Array.from(
        elem.querySelectorAll('select[ph-data]'))
}

