const jwt = require('jsonwebtoken');

function auth(req, res, next) {
    const token = req.headers.authorization;
    if (!token) {
        return res.status(401).json({
            status: 'error',
            message: 'token tidak ditemukan'
        });
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (err) {
        return res.status(401).json({
            status: 'error',
            message: 'token tidak valid'
        });
    }
}

module.exports = auth;