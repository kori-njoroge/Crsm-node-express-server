const productsRouter = require('express').Router()

const { addProduct, updateProduct, getAllProducts, getSingleProduct, deleteProduct } = require('../controllers/products-controllers')


productsRouter.post('/add',addProduct)
productsRouter.patch('/update',updateProduct)
productsRouter.get('/all',getAllProducts)
productsRouter.get('/single/:productId',getSingleProduct)
productsRouter.delete('/delete/:productId',deleteProduct)

module.exports={productsRouter}