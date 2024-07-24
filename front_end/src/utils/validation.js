class Validate {

  constructor(data) {
    const errors = {};
    let isValid = true;

    // iterate all fields eg: name, email, password
    for (var field in data) { 
      
      const value = data[field][0];
      const validateAgainst = data[field][1];
      const min_length = data[field][2];

      // iterate what we want to validate against
      for (let i = 0; i < validateAgainst.length; i++) {
        
        // dynamically run the validation function
        const test = this[validateAgainst[i]](value, min_length);
        
        // if we get an error, store it in the errors hashmap
        if (test.err){
          errors[field] = test.msg;
          isValid = false;
          break;
        } 
      } 
    }
    
    return {isValid, errors}
  }


  isEmpty = (value) => {
    return (
      {
        err: (value === undefined || value === null || (typeof value === 'object' && Object.keys(value).length === 0) || (typeof value === 'string' && value.trim().length === 0)),
        msg: "Required"
      }
    );
  };

  minLength = (value, len) => {
    return (
      {
        err: typeof value === 'string' && value.trim().length <= len,
        msg: "Too Short"
      }
    );
  };

  isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return (
      {
        err: !emailRegex.test(email),
        msg: "Invalid Email"
      }
    );
  };

}


export default Validate;

