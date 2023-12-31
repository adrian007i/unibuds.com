const User = require("../models/User");
const handleErrors = require("../validation/User");
const keys = require("../secrets/keys")
const jwt = require("jsonwebtoken")

/**
 * @desc    User registration with email verification
 * @access  Public 
 */ 
module.exports.signup_post = async (req, res) => {
    const { email, password, first_name, last_name } = req.body;

    try {
        const new_user = await User.create({ email, password, first_name, last_name });

        // token payload
        const payload = {
            id: new_user.id,
            email: new_user.email,
            firstname: new_user.firstname,
            lastname: new_user.lastname
        };

        // create the jwt
        jwt.sign(payload, keys["JWT_HASH"], { expiresIn: 60 * 60 * 24 * 30 * 3 }, (err, token) => {
            if (!err)
                res.json({ success: 'true', token: 'Bearer ' + token });
            else
                res.status(500).json({ server: "Internal Server Error" });

        }); 

    } catch (error) { 
        let errors = handleErrors(error);
        res.status(201).json(errors);
    }
}

module.exports.login_post = (req, res) => {
    res.send('logged in');
}