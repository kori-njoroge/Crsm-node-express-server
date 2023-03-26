const categoryRouter = require('express').Router();


const { createCategory, getAllCategories, getSingleCategory, updateCategoryDetails } = require('../controllers/category-controllers');


// routes
categoryRouter.post('/', createCategory)
categoryRouter.get('/all-categories', getAllCategories)
categoryRouter.get('/single/:catId', getSingleCategory)
categoryRouter.patch('/update', updateCategoryDetails)





module.exports = { categoryRouter }