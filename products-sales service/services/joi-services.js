const Joi = require('joi')


// CATEGORY VALIDATION SCHEMAS
const createCategorySchema = Joi.object({
    categoryName: Joi.string().required(),
    description: Joi.string().required(),
    addedBy: Joi.number().required()
})
const updateCategorySchema = Joi.object({
    catId: Joi.string().alphanum().required(),
    updatedBy: Joi.number().required(),
    categoryName: Joi.string().optional(),
    description: Joi.string().optional()
})

// PRODUCTS VALIDATION SCHEMAS
const createProductSchema = Joi.object({
    productName:Joi.string().required(),
    description:Joi.string().required(),
    addedBy:Joi.number().required(),
    price:Joi.number().required(),
    quantity:Joi.number().required(),
    categoryId:Joi.string().alphanum().required()
})

// EXPORTS
module.exports = { 
    // category
    createCategorySchema,updateCategorySchema,
    // products
    createProductSchema}