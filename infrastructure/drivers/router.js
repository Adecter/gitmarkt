import ServiceController from './controllers/service-controller.js'
import ServiceUseCase from '../../domain/use-cases/service.js'
import ServiceRepository from '../repositories/service-repository.js'
import multer from 'multer'
import express from 'express'
import serviceSchema from '../../domain/models/service-schema.js'

const router = express.Router()

const serviceController = new ServiceController(
    new ServiceUseCase(
        new ServiceRepository(),
        serviceSchema.serviceSchema
    ))


router.post('/register', multer().none(), (req, res, next) => {
    serviceController.register(req, res)
    .catch(err => res.status(400).json(err))
})
router.get('/categories', (req, res, next) => {
    serviceController.getCategories(res)
    .catch(err => res.status(400).json(err))
})



export default router

