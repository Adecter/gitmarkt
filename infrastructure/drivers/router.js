import ServiceController from './controllers/service-controller'
import ServiceUseCase from '../../domain/use-cases/service'
import ServiceRepository from '../repositories/service-repository'

const express = require('express')
const router = express.Router()

const serviceController = new ServiceController(
                            new ServiceUseCase(
                                new ServiceRepository()
                            ))


router.post('/register', serviceController.register)



export default router

  