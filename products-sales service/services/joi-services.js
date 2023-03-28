const Joi = require('joi')


// CATEGORY VALIDATION SCHEMAS
const createCategorySchema = Joi.object({
    role: Joi.string().required(),
    categoryName: Joi.string().required(),
    description: Joi.string().required(),
    addedBy: Joi.number().required()
})

const updateCategorySchema = Joi.object({
    catId: Joi.string().alphanum().required(),
    updatedBy: Joi.number().required(),
    categoryName: Joi.string().optional(),
    description: Joi.string().optional()
}).or('categoyName', 'description')

// PRODUCTS VALIDATION SCHEMAS
const createProductSchema = Joi.object({
    role: Joi.string().required(),
    productName: Joi.string().required(),
    description: Joi.string().required(),
    addedBy: Joi.number().required(),
    price: Joi.number().required(),
    quantity: Joi.number().required(),
    categoryId: Joi.string().alphanum().required(),
    token: Joi.string().required()
})

const updateProductSchema = Joi.object({
    id: Joi.string().alphanum().required(),
    updatedBy: Joi.number().required(),
    productName: Joi.string().optional(),
    description: Joi.string().optional(),
    price: Joi.number().optional(),
    quantity: Joi.number().optional(),
    approved: Joi.number().optional()
}).or('productName', 'description', 'price', 'quantity', 'approved')

// EXPORTS
module.exports = {
    // category
    createCategorySchema,
    updateCategorySchema,
    // products
    createProductSchema,
    updateProductSchema
}