const Joi = require('joi');

const productSchema = Joi.object({
    name: Joi.string()
        .min(3)
        .max(100)
        .required()
        .messages({ 'string.empty': 'Product name is required.', 'string.min': 'Product name must be at least 3 characters long.' }),
    description: Joi.string()
        .min(10)
        .max(500)
        .required()
        .messages({ 'string.empty': 'Description is required.', 'string.min': 'Description must be at least 10 characters long.' }),
    category: Joi.string()
        .required()
        .messages({ 'string.empty': 'Category is required.' }),
    priceOld: Joi.number()
        .positive()
        .required()
        .messages({ 'number.base': 'Price must be a valid number.', 'number.positive': 'Price must be greater than zero.' }),
    priceNew: Joi.number()
        .positive()
        .required()
        .max(Joi.ref('priceOld'))
        .messages({ 'number.base': 'Price must be a valid number.', 'number.positive': 'Price must be greater than zero.', 'number.max': 'New price cannot exceed old price.' }),
    startDate: Joi.date()
        .iso()
        .required()
        .messages({ 'date.base': 'Start date must be a valid ISO date.', 'date.format': 'Invalid date format.' }),
    freeDelivery: Joi.boolean()
        .default(false),
    deliveryAmount: Joi.number()
        .positive()
        .allow(null)
        .when('freeDelivery', {
            is: false,
            then: Joi.required(),
            otherwise: Joi.optional(),
        })
        .messages({ 'number.base': 'Delivery amount must be a valid number.', 'number.positive': 'Delivery amount must be greater than zero.' }),
});

module.exports = { productSchema };
