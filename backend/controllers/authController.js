const User = require("../models/User");
const handleErrors = require("../validation/User");
// const profileValidation = require("../validation/Profile");
const generateToken = require('../utils/generateToken');

/**
 * @desc    User registration with email verification
 * @access  Public 
 */
module.exports.register = async (req, res) => {
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
module.exports.login = async (req, res) => {
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
 * @desc    Fetch user data
 * @access  Private 
 */
module.exports.get_user = async (req, res) => {
    const user = await User.findOne({ _id: req.query.user_id }).select('-password');
    res.status(200).json(user);
}

/**
 * @desc    Update user data
 * @access  Private 
 */
module.exports.set_user = async (req, res) => {  

    User.findByIdAndUpdate(req.body._id, req.body, { new: false })
        .then(updatedUser => {
            if (updatedUser) {
                res.status(200).json({ success: true });
            } else {
                res.status(401).json({ message: "User Not Found" });
            }
        })
        .catch(error => {
            res.status(401).json({ message: "Server error occured" });
        });
    // res.status(200).json(user);
}

