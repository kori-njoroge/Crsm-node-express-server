const { customerAddedMail, purchasedCustomer } = require('../controllers/customer-controllers')

const customerRouter = require('express').Router()

customerRouter.post('/customer', customerAddedMail)
customerRouter.post('/purchase', purchasedCustomer)

module.exports = { customerRouter }