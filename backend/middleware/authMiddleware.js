const jwt = require('jsonwebtoken');
const User = require('../models/User');
require('dotenv').config();

const protect = async (req, res, next) => {
  let token;

  token = req.header('Authorization');

  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.JWT_HASH);

      const user = await User.findById(decoded._id).select('-password');
      if (user){
        req.user = user
        next();
      } 

      else
        res.status(401).json({ message: 'Not authorized, token failed' });

    } catch (error) {
      res.status(401).json({ message: 'Not authorized, token failed' });
    }

  } else {
    res.status(401).json({ message: 'Not authorized, no token' });
  }
}
module.exports = protect; 