
const userRouter = require('express').Router()

const { addUser, approveProduct, approveCategory } = require('../controllers/employee-controllers')

userRouter.post('/add-user', addUser)
userRouter.post('/new-product', approveProduct)
userRouter.post('/new-category',approveCategory)

module.exports = { userRouter }