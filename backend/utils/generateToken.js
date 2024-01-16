const jwt = require("jsonwebtoken");
const keys = require("../config/keys")

const generateToken = ({ _id, first_name, last_name }) => {
  const token = jwt.sign({
    _id, first_name, last_name
  }, keys["JWT_HASH"], {
    expiresIn: '90d',
  });
  return token;
};

module.exports = generateToken;