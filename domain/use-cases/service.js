
export default class ServiceUseCase {

    constructor(serviceRepository, serviceSchema) {
        this.serviceRepository = serviceRepository
        this.serviceSchema = serviceSchema
    }

    async createService(serviceDto) {
        await this.serviceSchema.validateAsync(serviceDto)
        return await this.serviceRepository.persistService(serviceDto)
    }

    async getAllServices(){
        return await this.serviceRepository.getAll()
    }
}