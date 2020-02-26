import ServiceController from './controllers/service-controller.js'
import ServiceUseCase from '../../domain/use-cases/service.js'
import ServiceRepository from '../repositories/service-repository.js'

import express from 'express'
import serviceSchema from '../../domain/models/service-schema.js'

const router = express.Router()

const serviceController = new ServiceController(
    new ServiceUseCase(
        new ServiceRepository(),
        serviceSchema.serviceSchema
    ))


router.post('/register', (req, res, next) => {
    serviceController.register(req, res, next).catch(err=>res.send(err))
})



export default router

