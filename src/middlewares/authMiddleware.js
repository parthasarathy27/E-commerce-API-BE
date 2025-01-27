const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ message: 'No token provided or invalid authorization format' });
    }

    const token = authHeader.split(' ')[1]; // Extract token
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET); // Verify token
        req.user = decoded; // Attach user information to the request
        next(); // Proceed to the next middleware/route
    } catch (error) {
        console.error('Token verification failed:', error.message);
        res.status(403).json({ message: 'Invalid or expired token' });
    }
};

module.exports = authMiddleware;
