import ServiceController from './controllers/service-controller.js'
import ServiceUseCase from '../../domain/use-cases/service.js'
import ServiceRepository from '../repositories/service-repository.js'
import multer from 'multer'
import express from 'express'
import serviceSchema from '../../domain/models/service-schema.js'

const router = express.Router()

async function createServiceController() {
    return new ServiceController(
        new ServiceUseCase(
            await ServiceRepository.create(),
            serviceSchema.serviceSchema
        ));
}


router.post('/register', multer().none(), async (req, res, next) => {
    (await createServiceController()).register(req, res)
        .catch(err => res.status(400).json(err))
})
router.get('/categories', async (req, res, next) => {
    (await createServiceController()).getCategories(res)
        .catch(err => res.status(400).json(err))
})



export default router

