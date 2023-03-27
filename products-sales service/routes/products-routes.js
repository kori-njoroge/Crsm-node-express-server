const productsRouter = require('express').Router()

const { addProduct, updateProduct, getAllProducts, getSingleProduct, deleteProduct } = require('../controllers/products-controllers')
const { SchemaValidateMiddleware } = require('../middlewares/schema-validate')
const { createProductSchema } = require('../services/joi-services')


productsRouter.post('/add',(req,res,next)=>{SchemaValidateMiddleware(req,res,next,createProductSchema)},addProduct)
productsRouter.patch('/update',updateProduct)
productsRouter.get('/all',getAllProducts)
productsRouter.get('/single/:productId',getSingleProduct)
productsRouter.delete('/delete/:productId',deleteProduct)

module.exports={productsRouter}