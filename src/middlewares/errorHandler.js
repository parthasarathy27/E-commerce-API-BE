const errorHandler = (err, req, res, next) => {
    console.error(err.stack);

    const statusCode = err.status || 500; // Default to 500 if no status code is provided
    const message = err.message || 'Internal server error';

    res.status(statusCode).json({
        message,
        ...(process.env.NODE_ENV === 'development' && { stack: err.stack }), // Include stack trace in development mode
    });
};

module.exports = errorHandler;
