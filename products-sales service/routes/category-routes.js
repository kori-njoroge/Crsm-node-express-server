const categoryRouter = require('express').Router();


const { createCategory, getAllCategories } = require('../controllers/category-controllers');


// routes
categoryRouter.post('/',createCategory)
categoryRouter.get('/all-categories',getAllCategories)





module.exports ={categoryRouter}