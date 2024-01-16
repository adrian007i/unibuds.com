const jwt = require('jsonwebtoken'); 
const User = require('../models/User');
const config = require('../config/keys')

const protect = async (req, res, next) => {
  let token;

  token = req.header('Authorization');

  if (token) {
    try {
      const decoded = jwt.verify(token, config["JWT_HASH"]);

      req.user = await User.findById(decoded.userId).select('-password');

      next();
    } catch (error) { 
      res.status(401).json({message : 'Not authorized, token failed'}); 
    }

  } else { 
    res.status(401).json({message : 'Not authorized, no token'});  
  }
}
module.exports = protect; 