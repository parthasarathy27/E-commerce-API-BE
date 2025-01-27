const Joi = require('joi');

const validateRequest = (schema, options = { abortEarly: false }) => (req, res, next) => {
    const { error } = schema.validate(req.body, options); // Pass options to Joi validate
    if (error) {
        console.error('Validation error:', error.details.map((detail) => detail.message));
        return res.status(400).json({
            message: 'Validation failed',
            errors: error.details.map((detail) => detail.message),
        });
    }
    next(); // Proceed if validation passes
};

module.exports = validateRequest;
