const isEmpty = require("./is-empty");

const profileValidation = (profile) => {
    let errors = { status : true , profilePicture: "", age: "", gender: "" };

    if (isEmpty(profile.bio)) {
        errors.bio = "Bio is required";
        errors.status = false;
    }

    if (isEmpty(profile.profilePicture)) {
        errors.profilePicture = "Profile Picture is required";
        errors.status = false;
    }

    if (isEmpty(profile.age)) {
        errors.age = "Age is required";
        errors.status = false;
    }

    if (isEmpty(profile.gender)) {
        errors.gender = "Gender is required";
        errors.status = false;
    }

    return errors;
};

module.exports = profileValidation;