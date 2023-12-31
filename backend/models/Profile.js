const mongoose = require("mongoose");

const profileSchema = new mongoose.Schema({
    bio: {
        type: String,
        maxlength: [300 , "Max Length Excceded"]
    },
    profilePicture: {
        type: String,
        required: [true, "Profile Picture Required"],
    },
    university: {
        type: String,
    },
    major: {
        type: String,
    },
    age: {
        type: Number,
        required: [true, "Age reqiured"]
    },
    gender: {
        type: String,
        enum: ['male', 'female', 'other'],
        default: 'other'
    },
    city: {
        type: String,
    },
});

module.exports = mongoose.model("Profile", profileSchema);