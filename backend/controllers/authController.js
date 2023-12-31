const User = require("../models/User");
const handleErrors = require("../validation/User");

module.exports.signup_post = async (req, res) => {
    const { email, password, first_name, last_name } = req.body;

    try {
        const new_user = await User.create({ email, password, first_name, last_name });
        res.status(201).json(new_user);

    } catch (error) { 
        console.log(error)
        let errors = handleErrors(error);
        res.status(201).json(errors); 
    }
}

module.exports.login_post = (req, res) => {
    res.send('logged in');
}