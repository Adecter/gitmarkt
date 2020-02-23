

export default class ServiceController {


    constructor(serviceUseCase) {
        this.serviceUseCase = serviceUseCase
    }


    async register(req, res){
        const result = this.serviceUseCase.createService(req)
        res.send(result)
    }

}