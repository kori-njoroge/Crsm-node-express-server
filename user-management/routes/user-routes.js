const userRouter = require('express').Router()


const { addUser, getAllUsers, login, addCustomer } = require('../controllers/users-controller')

// users
userRouter.get('/',getAllUsers)
userRouter.post('/signup',addUser)
userRouter.post('/login',login)
// customer
userRouter.post('/add-customer',addCustomer)

module.exports={userRouter}