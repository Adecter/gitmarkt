import Joi from '@hapi/joi'
export default {
    serviceSchema: Joi.object({
        name: Joi.string().required(),
        //TODO: need to validate lookup data
        category: Joi.number().required(),
        // logo: Joi.binary().required(),
        keywords: Joi.string().required()
    })
}