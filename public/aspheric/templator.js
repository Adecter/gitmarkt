import { getDynamicDropdowns } from "./selectors.js";

export async function processTemplates(renderer){


    //Process dropdowns
    const dropDowns = getDynamicDropdowns(document.body)
    
    for(const dropDown of dropDowns){

        
        const dataCallbackName = dropDown.getAttribute('ph-data')

        if(renderer.existSubscriberOn(dataCallbackName)){
            continue;
        }

        renderer.subscribeOn(dataCallbackName, (options)=>{

            //TODO: removeChild is faster
            dropDown.innerHTML = ''

            for(const option of options){
                const optElem = document.createElement('option')
                optElem.setAttribute('value', option.value)
                optElem.innerText = option.text
                dropDown.appendChild(optElem)
            }
        })
    }



}