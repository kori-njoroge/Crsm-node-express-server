const Joi = require('joi');


const addUserSchema = Joi.object({
    fullName: Joi.string()
        .required(),

    email: Joi.string()
        .email({ minDomainSegments: 2, tlds: ['*'] })
        .required(),
    phone: Joi.number()
        .min(9)
        .required(),

    gender: Joi.string().valid('male', 'female').required(),
    role: Joi.string().valid('super admin', 'admin', 'staff', 'customer').required(),
    token:Joi.string().required()
})

const loginSchema = Joi.object({
    email: Joi.string().email({ minDomainSegments: 2, tlds: ['*'] }).required(),
    password: Joi.string().min(6).required(),
});

const customerSchema = Joi.object({
    fullName: Joi.string()
        .required(),
    email: Joi.string()
        .email({ minDomainSegments: 2, tlds: ['*'] })
        .required(),
    phone: Joi.number()
        .min(9)
        .required(),
    gender: Joi.string()
        .valid('male', 'female')
        .required()
})

const singleCust = Joi.object({
    phone:Joi.number()
    .min(9)
    .required()
})

const editCustomerDet =Joi.object({
    id:Joi.string().alphanum().required(),
    fullName:Joi.string().optional(),
    phone:Joi.number().min(9).optional(),
    email:Joi.string().email({minDomainSegments: 2, tlds:['*']}).optional(),
}).or('fullName','phone','email')

module.exports = { addUserSchema, loginSchema, customerSchema,singleCust,editCustomerDet}