const mongoose = require('mongoose');
const { isEmail } = require('validator');
const bcrypt = require('bcrypt');

// USER PROFILE
const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: [true, 'Required'],
    minlength: [2, 'Too Short'],
  },
  lastName: {
    type: String,
    required: [true, 'Required'],
    minlength: [2, 'Too Short'],
  },
  email: {
    type: String,
    required: [true, 'Required'],
    unique: [true, 'Email Exist'],
    validate: [isEmail, 'Invalid Email'],
  },
  password: {
    type: String,
    required: [true, 'Required'],
    minlength: [6, 'At least 6 characters'],
  },
  bio: {
    type: String,
    maxlength: [300, 'Max Length Exceeded'],
    default: ''
  },
  profilePicture: {
    type: Buffer,
    default: ''
  },
  university: {
    type: String,
    default: ''
  },
  major: {
    type: String,
    default: ''
  },
  dob: {
    type: Date,
  },
  gender: {
    type: String,
    enum: ['male', 'female', 'other', ''],
    default: '',
  },
  campusLocation: {
    type: String,
    default: ''
  },
  emailVerified: {
    type: Boolean,
    default: false
  },
  dateCreated: {
    type: Date,
    default: Date.now,
  }, 
});

userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

// Hash the password before saving it to the database
userSchema.pre('save', async function (next) { 
  if (this.isNew){
    // Generate a salt
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password, salt);
    next();
  }
  
});

module.exports = mongoose.model('User', userSchema);
 