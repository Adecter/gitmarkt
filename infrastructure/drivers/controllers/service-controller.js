

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

    async addCategory(req,res){
        const result = await this.serviceUseCase.createCategory(req.body)
        res.send(result)
    }

    async renderServices(res){
        const result = await this.serviceUseCase.getServices()
        res.render('pages/index',{services:result})
    }

}