

export default class ServiceController {


    constructor(serviceUseCase) {
        this.serviceUseCase = serviceUseCase
    }


    async register(req, res){
        const result = await this.serviceUseCase.createService(req.body)
        res.send(result)
    }

    async getCategories(res){
        const result = await this.serviceUseCase.getCategories()
        res.send(result)
    }

}