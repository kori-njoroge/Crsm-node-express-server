const userRouter = require('express').Router()


const { addUser, getAllUsers, login, addCustomer, getCustomers, singleCustomer, editCustomer } = require('../controllers/users-controller')

// users
userRouter.get('/',getAllUsers)
userRouter.post('/signup',addUser)
userRouter.post('/login',login)
// customer
userRouter.post('/add-customer',addCustomer)
userRouter.get('/all-customers',getCustomers)
userRouter.post('/single-customer',singleCustomer)
userRouter.post('/edit-customer',editCustomer)

module.exports={userRouter}