const productsRouter = require('express').Router()

const { addProduct, updateProduct, getAllProducts, getSingleProduct, deleteProduct } = require('../controllers/products-controllers')
const { SchemaValidateMiddleware } = require('../middlewares/schema-validate')
const { createProductSchema, updateCategorySchema } = require('../services/joi-services')


productsRouter.post('/add', (req, res, next) => { SchemaValidateMiddleware(req, res, next, createProductSchema) }, addProduct)
productsRouter.get('/all', getAllProducts)
productsRouter.get('/single/:productId', getSingleProduct)
productsRouter.patch('/update', (req, res, next) => { SchemaValidateMiddleware(req, res, next, updateCategorySchema) }, updateProduct)
productsRouter.delete('/delete/:productId', deleteProduct)

module.exports = { productsRouter }