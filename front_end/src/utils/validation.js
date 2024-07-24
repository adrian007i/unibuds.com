export const isEmpty = (value) => {
  return (
    value === undefined ||
    value === null ||
    (typeof value === 'object' && Object.keys(value).length === 0) ||
    (typeof value === 'string' && value.trim().length === 0)
  );
};

export const minLength = (value, len) => {
  return typeof value === 'string' && value.trim().length <= len
};


export const isValidEmail = (email) => { 
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};


