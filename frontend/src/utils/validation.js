module.exports.isEmpty = (value) => {
  return (
    value === undefined ||
    value === null ||
    (typeof value === 'object' && Object.keys(value).length === 0) ||
    (typeof value === 'string' && value.trim().length === 0)
  );
};

module.exports.minLength = (value, len) => {
  return typeof value === 'string' && value.trim().length <= len
};


module.exports.isValidEmail = (email) => { 
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};


