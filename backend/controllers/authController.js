const User = require("../models/User");
const handleErrors = require("../validation/User");
const profileValidation = require("../validation/Profile");
const generateToken = require('../utils/generateToken');

/**
 * @desc    User registration with email verification
 * @access  Public 
 */
module.exports.signup_post = async (req, res) => {
    const { email, password, first_name, last_name } = req.body;

    try {
        const new_user = await User.create({ email, password, first_name, last_name });

        // create the jwt 
        res.status(201).json({ token: generateToken(new_user) });

    } catch (error) {
        let errors = handleErrors(error);
        res.status(400).json(errors);
    }
}

/**
 * @desc    Login a user
 * @access  Public 
 */
module.exports.login_post = async (req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (user && (await user.matchPassword(password)))
        res.status(200).json({ token: generateToken(user) });

    else if (!user)
        res.status(401).json({ message: "This email is not registered" });
    else
        res.status(401).json({ message: "Invalid email or password" });
}

/**
 * @desc    Fetch profile data
 * @access  Private 
 */
module.exports.get_profile_info = async (req, res) => {
    const user = await User.findOne({ _id: req.query.user_id }).select('-password');;
    res.status(200).json(user);
}

/**
 * @desc    Fetch profile data
 * @access  Private 
 */
module.exports.set_profile_info = async (req, res) => {
    // const user = await User.findOne({ _id: req.query.user_id }).select('-password');; 

    User.findByIdAndUpdate(req.body._id, req.body, { new: false })
        .then(updatedUser => {
            if (updatedUser) {
                console.log('User updated successfully:', updatedUser);
            } else {
                console.log('User not found');
            }
        })
        .catch(error => {
            console.error('Error updating user:', error);
        });
    // res.status(200).json(user);
}

