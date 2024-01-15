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
        generateToken(res, new_user._id);
        res.status(201).json({
            _id: new_user._id,
            email: new_user.email,
            first_name: new_user.first_name,
            last_name: new_user.last_name
        });

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

    if (user && (await user.matchPassword(password))) {
        generateToken(res, user._id);

        res.json({
            _id: user._id,
            email: user.email,
            first_name: user.first_name,
            last_name: user.last_name
        });

    }
    else if (!user)
        res.status(401).json({ message: "This email is not registered" });
    else
        res.status(401).json({ message: "Invalid email or password" });
}

/**
 * @desc    Logout a user
 * @access  Private 
 */
module.exports.logout_post = (req, res) => {
    res.cookie('jwt', '', {
        httpOnly: true,
        expires: new Date(0),
    });
    res.status(200).json({ message: 'Logged out successfully' });
};


/**
 * @desc    User to update additional details of their profile
 * @access  Private 
 */
module.exports.update_profile_info = async (req, res) => {

    const user = await User.findOne({ _id: req.user.id });

    const errors = await profileValidation(req.body);

    if (!errors.status)
        res.status(201).json(errors);
    else {
        const profile = { bio, profilePicture, university, major, age, gender, city } = req.body; 
        user.profile = profile;
        await user.save();

        res.status(201).json({ "message": "profile updated" }); 
    } 
}
