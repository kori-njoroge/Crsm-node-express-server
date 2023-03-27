const productsRouter = require('express').Router()

const { addProduct, updateProduct, getAllProducts, getSingleProduct } = require('../controllers/products-controllers')


productsRouter.post('/add',addProduct)
productsRouter.patch('/update',updateProduct)
productsRouter.get('/all',getAllProducts)
productsRouter.get('/single/:productId',getSingleProduct)

module.exports={productsRouter}