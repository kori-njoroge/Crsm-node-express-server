const productsRouter = require('express').Router()

const { addProduct, updateProduct } = require('../controllers/products-controllers')


productsRouter.post('/add',addProduct)
productsRouter.post('/update',updateProduct)

module.exports={productsRouter}