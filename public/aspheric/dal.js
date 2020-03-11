import { getFormsWithoutListeners } from "./selectors.js";

export async function processForms(renderer) {

    const forms = getFormsWithoutListeners(document.body).map(x => {
        return {
            button: x,
            method: x.form.method,
            action: x.form.action,
            dataName: x.form.getAttribute('ph-data')
        }
    })

    for (const form of forms) {
        form.button.onclick = async (e) => {
            e.preventDefault()
            const formData = new FormData(e.target.form)
          
        }
    }



}