import Joi from '@hapi/joi'
export default {
    categorySchema: Joi.object({
        name: Joi.string().required(),
        //TODO: need to validate lookup data
        category: Joi.number().required(),
    })
}