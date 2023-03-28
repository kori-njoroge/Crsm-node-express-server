
const userRouter = require('express').Router()

const { addUser, approveProduct } = require('../controllers/employee-controllers')

userRouter.post('/add-user', addUser)
userRouter.post('/new-product', approveProduct)

module.exports = { userRouter }