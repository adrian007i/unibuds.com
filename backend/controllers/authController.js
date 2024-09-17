const User = require('../models/User');
const Universities = require('../models/Universities');
const handleErrors = require('../validation/User');
const generateToken = require('../utils/generateToken');
const getRandomFileName = require('../utils/getRandomFileName');
const mongoose = require('mongoose');

const { PutObjectCommand, DeleteObjectCommand } = require('@aws-sdk/client-s3');
const { s3Client } = require('../utils/awsConfig');
require('dotenv').config();

/** 
 * @desc    User registration with email verification
 * @access  Public 
 */
module.exports.register = async (req, res) => {

    try {
        let { email, password, firstName, lastName, pictureExt, university } = req.body;
        let universityObject;

        if (university)

            // ensure valid university ID
            try {
                university = new mongoose.Types.ObjectId(university);
                universityObject = await Universities.findById(university).select(['_id']);
                if (!universityObject)
                    throw Error()
            } catch {
                university = ""
            }


        let profilePicture = undefined;

        // ENSURE THE PROFILE PICTURE WAS UPLOADED AND REBUILD THE PICTURE USING THE BUFFER
        if (req.file && req.file.buffer) {
            profilePicture = getRandomFileName() + '.' + pictureExt;

            const params = {
                Bucket: process.env["S3BucketName"],
                Key: profilePicture,
                Body: req.file.buffer,
                CacheControl: 'max-age:31536000'
            };

            // STORE USER PROFILE PICTURE IN S3
            try {
                await s3Client.send(new PutObjectCommand(params));
            } catch (err) {
                res.status(500).json({ "profilePicture": "Failed to upload!" });
            }
        }

        const newUser = await User.create({ email, password, firstName, lastName, profilePicture, university });

        // ASYNC INSERT THE USER INTO THE NEW UNIVERSITIES->USERS
        Universities.updateOne(
            { _id: universityObject._id },
            { $push: { users: newUser._id } }
        ).exec()

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
    const user = await User.findOne({ _id: req.user._id })
        .select(['-password', '-__v', '-_id'])
        .populate([
            {
                path: 'university',
                select: 'name',
            }
        ]);

    res.status(200).json(user);
}

/**
 * @desc    Update user data
 * @access  Private 
 */
module.exports.set_user = async (req, res) => {
    const user = await User.findOne({ _id: req.user._id });

    let oldUniversity = user.university._id.toString();
    let newUniversity = req.body.data.university;
    let universityObject;

    if (user) {

        const u = req.body.data;

        try {
            user.bio = u.bio;
            user.firstName = u.firstName;
            user.lastName = u.lastName;
            user.dob = u.dob;
            user.gender = u.gender;
            user.major = u.major;
            user.email = u.email;

            // only modify university values if they are different
            if (oldUniversity !== newUniversity) {

                // ensure new university is valid
                try {
                    u.university = new mongoose.Types.ObjectId(newUniversity);
                    universityObject = await Universities.findById(u.university).select(["_id"]);

                    if (!universityObject)
                        throw Error()

                } catch {
                    u.university = ""
                }

                user.university = u.university;
            }

            // ENSURE THE PROFILE PICTURE WAS UPLOADED AND REBUILD THE PICTURE USING THE BUFFER
            if (req.file && req.file.buffer) {

                // REMOVE THE OLD IMAGE
                try {
                    s3Client.send(new DeleteObjectCommand({
                        Bucket: process.env["S3BucketName"],
                        Key: user.profilePicture,
                    }));
                }
                catch (err) {
                    console.log(err);

                };

                // generate new name for image                
                user.profilePicture = getRandomFileName() + '.' + req.body.proPicExt

                // STORE USER PROFILE PICTURE IN S3
                try {
                    await s3Client.send(new PutObjectCommand({
                        Bucket: process.env["S3BucketName"],
                        Key: user.profilePicture,
                        Body: req.file.buffer,
                        CacheControl: 'max-age:31536000'
                    }));

                } catch (err) {
                    console.error(err);
                    res.status(500).json({ "profilePicture": "Failed to upload!" });
                }
            }


            await user.save();

            if (oldUniversity !== newUniversity) {

                // ASYNC INSERT THE USER INTO THE NEW UNIVERSITIES->USERS 
                Universities.updateOne(
                    { _id: universityObject._id },
                    { $push: { users: user._id } }
                ).exec()

                // ASYNC remove user from old university  
                Universities.updateOne(
                    { _id: new mongoose.Types.ObjectId(oldUniversity), users: user._id },
                    { $set: { "users.$": null } }
                ).exec() 
            }

            res.status(200).json({ success: true, 'profilePicture': user.profilePicture });

        } catch (error) {
            let errors = handleErrors(error, 'update');
            res.status(403).json(errors);
        }
    }
}


/**
 * @desc    Load universities on key press
 * @access  Private 
 */
module.exports.get_universities = async (req, res) => {

    try {

        // splits the university search name "university of south dakota" and creates a rejex for each
        const regex = new RegExp(req.body.name.split(" ").map(part => `(?=.*${part})`).join(''), 'i');

        const data = await Universities.find({
            name: regex
        }).limit(10).select(['_id', 'name'])

        res.status(200).json({ "data": data });
    }

    catch (e) {
        res.status(403).json({ "errors": "something went wrong" });
    }

}

