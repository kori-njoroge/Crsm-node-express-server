
const userRouter = require('express').Router()

const { addUser } = require('../controllers/customer-controllers')

userRouter.post('/add-user', addUser)

module.exports = { userRouter }