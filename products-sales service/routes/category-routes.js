const categoryRouter = require('express').Router();


const { createCategory } = require('../controllers/category-controllers');


// routes
categoryRouter.post('/',createCategory)





module.exports ={categoryRouter}