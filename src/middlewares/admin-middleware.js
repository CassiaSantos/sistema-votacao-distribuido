// src/middlewares/admin.middleware.js

const adminMiddleware = async (req, res, next) => {
    if (!req.user.isAdmin) {
      return res.status(403).json({ error: 'Acesso negado' });
    }
    next();
  };
  
  module.exports = adminMiddleware;