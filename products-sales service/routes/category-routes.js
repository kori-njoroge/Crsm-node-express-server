const categoryRouter = require('express').Router();


const { createCategory, getAllCategories, getSingleCategory } = require('../controllers/category-controllers');


// routes
categoryRouter.post('/',createCategory)
categoryRouter.get('/all-categories',getAllCategories)
categoryRouter.get('/single/:catId',getSingleCategory)





module.exports ={categoryRouter}