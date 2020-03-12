
export default class ServiceUseCase {

    constructor(serviceRepository, serviceSchema, categorySchema) {
        this.serviceRepository = serviceRepository
        this.serviceSchema = serviceSchema
        this.categorySchema = categorySchema
    }

    async createService(serviceDto) {
        await this.serviceSchema.validateAsync(serviceDto)
        await this.serviceRepository.persistService(serviceDto)
    }

    async getAllServices(){
        return await this.serviceRepository.getAll()
    }

    async getCategories(){
        return await this.serviceRepository.getCategories()
    }

    async createCategory(categoryDto){
        await this.categorySchema.validateAsync(categoryDto)
        await this.serviceRepository.persistCategory(categoryDto)
    }
}