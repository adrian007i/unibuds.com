const handleErrors = (err,   type) => {
    let errors = { email: '', password: '', first_name: '', last_name: '' };

    if (err.code === 11000) {
        errors.email = 'This email exist already'
    }

    // if (type === 'update') {
    //     errors.age = '';
    //     errors.gender = ''; 

    //     if (!data.age) errors.age = 'Required';
    //     if (!data.gender) errors.gender = 'Required';
    // }
 
    if (err._message) {
        Object.values(err.errors).forEach(properties => errors[properties.path] = properties.message);
    }
    return errors;
}

module.exports = handleErrors;