import serviceSchema from '../models/service-schema'

export const prepareService = async (dto) => {
    await serviceSchema.validateAsync()
}