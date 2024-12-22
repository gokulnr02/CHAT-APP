const jwt = require('jsonwebtoken');

// Middleware to protect routes
function authenticateToken(req, res, next) {
    const token = req.headers['authorization']?.split(' ')[1];
    if (!token) return res.status(401).json({"status": 401,message: 'Access token required' });
  
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
      req.user = decoded; 
      next();
    } catch (error) {
      res.status(403).json({ "status": 403, message: 'Invalid or expired token' });
    }
  }

  module.exports={authenticateToken}
