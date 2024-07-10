const jwt = require('jsonwebtoken');
const User = require('../models/User');
require('dotenv').config();

const protectRaw = async (token, user) => {

  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.JWT_HASH);

      const user = await User.findById(decoded._id).select('-password');
      if (user) {
        return { "authenticated": true, "user": user }
      }

      else
        return { message: 'Not authorized, token failed' };

    } catch (error) {
      return { message: 'Not authorized, token failed' };
    }

  } else {
    return { message: 'Not authorized, no token' }
  }
}

const protect = async (req, res, next) => {
  let token = req.header('Authorization');
  let raw = await protectRaw(token);

  if (raw.authenticated){ 
    req.user = raw.user;
    next()
  }
    
  else
    res.status(401).json({ message: raw.message });
}

module.exports = {protect, protectRaw}; 