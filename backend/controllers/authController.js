const User = require('../models/User');
const handleErrors = require('../validation/User');
const generateToken = require('../utils/generateToken');

/** 
 * @desc    User registration with email verification
 * @access  Public 
 */
module.exports.register = async (req, res) => {  
    const profilePicture = req.file.buffer;
    const { email, password, firstName, lastName } = req.body;

    try {
        const newUser = await User.create({ email, password, firstName, lastName, profilePicture });

        // create the jwt 
        res.status(201).json({ token: generateToken(newUser) });

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

    // find the user by email
    const user = await User.findOne({ email });

    // ensure the password is correct
    if (user && (await user.matchPassword(password)))
        res.status(200).json({ token: generateToken(user) });

    else if (!user)
        res.status(401).json({ message: 'This email is not registered' });
    else
        res.status(401).json({ message: 'Invalid email or password' });
}

/**
 * @desc    Fetch user data
 * @access  Private 
 */
module.exports.get_user = async (req, res) => {
    const user = await User.findOne({ _id: req.user._id }).select(['-password','-__v','-_id']);
    res.status(200).json(user);
}

/**
 * @desc    Update user data
 * @access  Private 
 */
module.exports.set_user = async (req, res) => {

    const user = await User.findOne({ _id: req.user._id }); 
    
    if (user) {

        const u = req.body;

        try {  
            // Update user fields 
            user.profilePicture = u.profilePicture;
            user.bio = u.bio;
            user.firstName = u.firstName;
            user.lastName = u.lastName;
            user.dob = u.dob;
            user.gender = u.gender;
            user.major = u.major;
            user.campusLocation = u.campusLocation; 
            user.email = u.email;


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