const User = require("../models/User");
const handleErrors = require("../validation/User");
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
        let errors = handleErrors(error, 'create');
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
    const user = await User.findOne({ _id: req.user._id }).select('-password');
    res.status(200).json(user);
}

/**
 * @desc    Update user data
 * @access  Private 
 */
module.exports.set_user = async (req, res) => {
    const user = await User.findOne({ _id: req.user._id });

    if (user) {

        // for security we remove any unwanted fields
        delete req.body._id;
        delete req.body.password;
        delete req.body.__v;

        // Save the updated user back to the database
        try { 

            // Update user fields
            Object.assign(user, req.body);

            await user.save();
            res.status(200).json({ success: true });
        } catch (error) { 
            let errors = handleErrors(error, 'update');
            res.status(403).json(errors);
        }
    } else {
        console.log('User not found');
    }
}

