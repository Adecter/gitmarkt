import { getDynamicFormsWithoutListeners } from "./selectors.js";

export function trackFormsWithoutListeners(renderer) {

    const forms = getDynamicFormsWithoutListeners(document.body).map(x => {
        return {
            button: x,
            method: x.form.method,
            action: x.form.action,
            datakey: x.form.getAttribute('ph-data')
        }
    })

    for (const form of forms) {
        form.button.onclick = async (e) => {
            e.preventDefault()
            
            await renderer.dataConfig.push(
                form.datakey, new FormData(e.target.form)
            )
        }
    }



}