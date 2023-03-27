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

// EXPORTS
module.exports = { createCategorySchema,updateCategorySchema}