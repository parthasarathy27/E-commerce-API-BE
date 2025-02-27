const roleMiddleware = (roles) => (req, res, next) => {
    if (!roles.includes(req.user.role)) {
        console.error(`Access denied for role: ${req.user.role}`);
        return res.status(403).json({ message: 'Access denied. You do not have the required permissions.' });
    }
    next(); // Proceed if the role is authorized
};

module.exports = roleMiddleware;
