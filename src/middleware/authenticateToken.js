const jwt = require('jsonwebtoken');
const JWT_SECRET_KEY = "123123"; // dummy secret key for testing purpose


// Middleware to check if user is authorized with the given token at the time of login
const authenticateToken = (req, res, next) => {
    const token = req.header('Authorization');

    if (!token) {
        return res.status(401).json({ error: 'Unauthorized: No token provided' });
    }

    jwt.verify(token, JWT_SECRET_KEY, (err, user) => {
        if (err) {
            return res.status(403).json({ error: 'Unauthorized: Invalid token' });
        }
        req.user = user;
        next();
    });
};


module.exports = authenticateToken;