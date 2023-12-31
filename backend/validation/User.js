const handleErrors = (err) => {
    let errors = { email: "", password: "", first_name: "", last_name: "" };

    if (err.code === 11000) { 
        errors.email = "This email exist already"
    }

    if (err._message) {
        Object.values(err.errors).forEach(properties => errors[properties.path] = properties.message);
    }

    return errors;
}

module.exports = handleErrors;