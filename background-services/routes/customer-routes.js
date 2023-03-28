const { customerAddedMail } = require('../controllers/customer-controllers')

const customerRouter = require('express').Router()

customerRouter.post('/customer', customerAddedMail)


module.exports = { customerRouter }