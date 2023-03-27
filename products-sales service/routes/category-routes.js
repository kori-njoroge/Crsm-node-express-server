const categoryRouter = require('express').Router();


const { createCategory, getAllCategories, getSingleCategory, updateCategoryDetails, deleteCategory } = require('../controllers/category-controllers');
const { SchemaValidateMiddleware } = require('../middlewares/schema-validate');
const { createCategorySchema, updateCategorySchema } = require('../services/joi-services');


// routes
categoryRouter.post('/add', (req, res, next) => { SchemaValidateMiddleware(req, res, next, createCategorySchema) }, createCategory)
categoryRouter.get('/all-categories', getAllCategories)
categoryRouter.get('/single/:catId', getSingleCategory)
categoryRouter.patch('/update', (req, res, next) => { SchemaValidateMiddleware(req, res,next ,updateCategorySchema) }, updateCategoryDetails)
categoryRouter.delete('/delete/:catId', deleteCategory)





module.exports = { categoryRouter }