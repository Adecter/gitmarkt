export function getLinksWithoutListeners(elem){
    return Array.from(elem.querySelectorAll('a')).filter(x=>!!!x.onclick)
}