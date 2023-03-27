const productsRouter = require('express').Router()

const { addProduct, updateProduct, getAllProducts } = require('../controllers/products-controllers')


productsRouter.post('/add',addProduct)
productsRouter.post('/update',updateProduct)
productsRouter.get('/all',getAllProducts)

module.exports={productsRouter}