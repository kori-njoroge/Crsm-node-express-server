const reportsRouter = require('express').Router()

const { getCountForAll } = require('../controllers/reports-controllers')


reportsRouter.get('/count', getCountForAll)

module.exports = { reportsRouter }