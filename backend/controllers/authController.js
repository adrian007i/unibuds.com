const User = require("../models/User");
const handleErrors = require("../validation/User");
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
        res.status(201).json(errors);
    }
}

/**
 * @desc    User to update additional details of their profile
 * @access  Private 
 */
module.exports.update_profile_info = async (req, res) => {
    console.log(123)
    // const { profilePicture , major, last_name } = req.body;

    // try {
    //     const new_user = await User.create({ email, password, first_name, last_name });

    //     // token payload
    //     const payload = {
    //         id: new_user.id,
    //         email: new_user.email,
    //         firstname: new_user.firstname,
    //         lastname: new_user.lastname
    //     };

    //     // create the jwt
    //     jwt.sign(payload, keys["JWT_HASH"], { expiresIn: 60 * 60 * 24 * 30 * 3 }, (err, token) => {
    //         if (!err)
    //             res.json({ success: 'true', token: 'Bearer ' + token });
    //         else
    //             res.status(500).json({ server: "Internal Server Error" });

    //     }); 

    // } catch (error) { 
    //     let errors = handleErrors(error);
    //     res.status(201).json(errors);
    // }
}

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
        res.status(401).json({ error: "This email is not registered" });
    else
        res.status(401).json({ error: "Invalid email or password" });
}
