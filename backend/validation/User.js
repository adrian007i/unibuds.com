const handleErrors = (err,   type) => {
    let errors = { email: '', password: '', firstName: '', lastName: '', profilePicture:'', university:''};
    
    if (err.code === 11000) {
        errors.email = 'This email exist already'
    }
 
    if (err._message) { 
        Object.values(err.errors).forEach(properties => errors[properties.path] = properties.message);
    }

    if (errors.university){
        errors.university = "Invalid University"
    }
     
    return errors;
}

module.exports = handleErrors;