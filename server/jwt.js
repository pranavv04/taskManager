const jwt = require('jsonwebtoken')
require('dotenv').config();


const jwtAuthMiddleware = (req, res, next) => {
    const authorization = req.headers.authorization;
    if (!authorization) {
        return res.status(401).json({ error: "Token not found" });
    }
    const token = authorization.split(' ')[1];
    if (!token) {
        return res.status(401).json({ error: "Token not found" });
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded; 
        console.log('Decoded User:', req.user); 
        next();
    } catch (error) {
        console.error(error); 
        res.status(401).json({ error: 'Invalid token' });
    }
};

const adminMiddleware = (req, res, next) => {
    try {
        console.log('User Role:', req.user.role); 
        if (req.user.role !== 'admin') {
            return res.status(403).json({ message: "Access denied. Admins only" });
        }
        next();
    } catch (error) {
        console.error('Admin middleware error:', error); 
        return res.status(500).json({ error: 'Server error' });
    }
};


const generateToken = (userData) => {
    const { id, username, role } = userData; 
    return jwt.sign({ id, username, role }, process.env.JWT_SECRET, { expiresIn: '8h' });
};

module.exports = {jwtAuthMiddleware, adminMiddleware , generateToken}