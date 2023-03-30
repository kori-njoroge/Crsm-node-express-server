const reportsRouter = require('express').Router()

const { getCountForAll, getTopCustomers } = require('../controllers/reports-controllers')


reportsRouter.get('/count', getCountForAll)
reportsRouter.get('/top-customers', getTopCustomers)

module.exports = { reportsRouter }