
const userRouter = require('express').Router()

const { addUser } = require('../controllers/employee-controllers')

userRouter.post('/add-user', addUser)

module.exports = { userRouter }