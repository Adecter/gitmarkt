import ServiceController from './controllers/service-controller.js'
import ServiceUseCase from '../../domain/use-cases/service.js'
import ServiceRepository from '../repositories/service-repository.js'
import multer from 'multer'
import express from 'express'
import serviceSchema from '../../domain/models/service-schema.js'
import categorySchema from '../../domain/models/category-schema.js'

const router = express.Router()

const categories = '/categories'
const register = '/services'
const listServices = '/list-services' //route for EJS template

async function createServiceController() {
    return new ServiceController(
        new ServiceUseCase(
            await ServiceRepository.create(),
            serviceSchema.serviceSchema,
            categorySchema.categorySchema
        ));
}


router.post(register, multer().none(), async (req, res, next) => {
    (await createServiceController()).register(req, res)
        .catch(err => res.status(400).json(err))
})

router.get(categories, async (req, res, next) => {
    (await createServiceController()).getCategories(res)
        .catch(err => res.status(400).json(err))
})
router.post(categories, multer().none(), async (req, res, next) => {
    (await createServiceController()).addCategory(req,res)
        .catch(err => res.status(400).json(err))
})
router.get(listServices, multer().none(), (req, res, next) => {
    res.render('pages/index');
})



export default router

