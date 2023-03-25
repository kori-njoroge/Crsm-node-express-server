const userRouter = require('express').Router()

const { SchemaValidateMiddleware } = require('../middlewares/schema-validate')
const { addUser, getAllUsers, login, addCustomer, getCustomers, singleCustomer, editCustomer } = require('../controllers/users-controller')
const { addUserSchema, loginSchema, customerSchema, editCustomerDet, singleCust } = require('../services/joi-services')
const { validateJwtTokenUsers } = require('../middlewares/authenticate-middleware')

// users
userRouter.get('/', validateJwtTokenUsers, getAllUsers)
userRouter.post('/signup',validateJwtTokenUsers,(req, res, next) => {SchemaValidateMiddleware(req, res, next, addUserSchema)}, addUser)
userRouter.post('/login', validateJwtTokenUsers, (req, res, next) => { SchemaValidateMiddleware(req, res, next, loginSchema) }, login)

// customer routes
userRouter.get('/all-customers', validateJwtTokenUsers, getCustomers)
userRouter.post('/add-customer',validateJwtTokenUsers,(req, res, next) => {SchemaValidateMiddleware(req, res, next, customerSchema)},addCustomer)
userRouter.post('/single-customer', validateJwtTokenUsers,(req, res, next) => {SchemaValidateMiddleware(req, res, next, singleCustjoin)}, singleCustomer)
userRouter.patch('/edit-customer', validateJwtTokenUsers,(req, res, next) => {SchemaValidateMiddleware(req, res, next, editCustomerDet)}, editCustomer)

module.exports = { userRouter }