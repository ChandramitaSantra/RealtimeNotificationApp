const jwt = require('jsonwebtoken');

// Middleware to authenticate WebSocket connection via JWT
function authMiddleware(socket, next) {
    const token = socket.handshake.query.token;
    
    if (!token) {
        return next(new Error('Authentication error'));
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        
        socket.user = decoded;
        next();
    } catch (error) {
        return next(new Error('Invalid token'));
    }
}

module.exports = authMiddleware;
