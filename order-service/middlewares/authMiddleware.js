const jwt = require('jsonwebtoken');
const axios = require('axios');

// Middleware to authenticate requests
const authMiddleware = async (req, res, next) => {
    const token = req.header('Authorization');

    if (!token) {
        return res.status(401).json({ message: 'Access denied. No token provided.' });
    }

    try {
        // Verify token with User Service
        const response = await axios.post('http://localhost:3000/api/verify-token', { token });

        if (response.data && response.data.valid) {
            req.user = response.data.user;
            next();
        } else {
            res.status(401).json({ message: 'Invalid token.' });
        }
    } catch (err) {
        res.status(500).json({ message: 'Failed to verify token with User Service.' });
    }
};

module.exports = authMiddleware;