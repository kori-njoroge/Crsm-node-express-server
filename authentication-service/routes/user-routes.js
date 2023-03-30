const userRouter = require('express').Router()

const { SchemaValidateMiddleware } = require('../middlewares/schema-validate')
const { addUser, getAllUsers, login, addCustomer, getCustomers, singleCustomer, editCustomer, updateUserDetails } = require('../controllers/users-controller')
const { addUserSchema, loginSchema, customerSchema, editCustomerDet, singleCust, editUsersDetails } = require('../services/joi-services')
const { validateJwtTokenUsers } = require('../middlewares/authenticate-middleware')

// users
userRouter.get('/', validateJwtTokenUsers, getAllUsers)
userRouter.post('/login', (req, res, next) => { SchemaValidateMiddleware(req, res, next, loginSchema) }, login)
userRouter.post('/signup', (req, res, next) => { SchemaValidateMiddleware(req, res, next, addUserSchema) }, addUser)
userRouter.patch('/update-user', validateJwtTokenUsers, updateUserDetails)
// customer routes
userRouter.get('/all-customers', validateJwtTokenUsers, getCustomers)
userRouter.post('/add-customer', validateJwtTokenUsers, (req, res, next) => { SchemaValidateMiddleware(req, res, next, customerSchema) }, addCustomer)
userRouter.post('/single-customer', validateJwtTokenUsers, (req, res, next) => { SchemaValidateMiddleware(req, res, next, singleCust) }, singleCustomer)
userRouter.patch('/edit-customer', validateJwtTokenUsers, (req, res, next) => { SchemaValidateMiddleware(req, res, next, editCustomerDet) }, editCustomer)

module.exports = { userRouter }