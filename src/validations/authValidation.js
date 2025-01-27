const Joi = require('joi');

const signupSchema = Joi.object({
    username: Joi.string()
        .min(3)
        .max(30)
        .required()
        .messages({ 'string.empty': 'Username is required.', 'string.min': 'Username must be at least 3 characters long.' }),
    email: Joi.string()
        .email()
        .required()
        .messages({ 'string.empty': 'Email is required.', 'string.email': 'Invalid email format.' }),
    password: Joi.string()
        .min(6)
        .required()
        .messages({ 'string.empty': 'Password is required.', 'string.min': 'Password must be at least 6 characters long.' }),
    role: Joi.string()
        .valid('buyer', 'vendor')
        .default('buyer')
        .required()
        .messages({ 'string.empty': 'Role is required.', 'any.only': 'Role must be either buyer or vendor.' }),
});

const loginSchema = Joi.object({
    email: Joi.string()
        .email()
        .required()
        .messages({ 'string.empty': 'Email is required.', 'string.email': 'Invalid email format.' }),
    password: Joi.string()
        .min(6)
        .required()
        .messages({ 'string.empty': 'Password is required.', 'string.min': 'Password must be at least 6 characters long.' }),
});

module.exports = { signupSchema, loginSchema };
