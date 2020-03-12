// Finds links without ph-id
export function getNewLinks(elem){
    return Array.from(elem.querySelectorAll('a')).filter(x=>!!!x.getAttribute('ph-id'))
}

export function getDynamicFormsWithoutListeners(elem){
    return Array.from(
        elem.querySelectorAll('form[ph-data] button[type="submit"')).filter(x=>!!!x.onclick)
        
}

export function getDynamicDropdowns(elem){
    return Array.from(
        elem.querySelectorAll('select[ph-data]'))
}

