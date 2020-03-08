import { getFormsWithoutListeners } from "./selectors.js";

export async function processForms() {

    const forms = getFormsWithoutListeners(document.body).map(x => {
        return { button: x, method: x.form.method, action: x.form.action }
    })

    for (const form of forms) {
        form.button.onclick = async (e) => {
            e.preventDefault()
            const formData = new FormData(e.target.form)
            const response = await fetch(form.action,
                {
                    method: 'POST',
                    body: formData 
                    //Default is multipart/formdata
                }
            )
            if(response.ok){
                alert('Service added')
            }
        }
    }



}