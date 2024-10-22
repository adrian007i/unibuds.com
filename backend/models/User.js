const mongoose = require('mongoose');
const { isEmail } = require('validator');
const bcrypt = require('bcrypt'); 
const Schema = mongoose.Schema; 
const chatSchema = require('./Chat')

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
    type: String,
    required: [true, 'Required'], 
  }, 
  university: {
    type: Schema.Types.ObjectId,
    ref: 'Universities',
    required: [true, 'Required']
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
  emailVerified: {
    type: Boolean,
    default: false
  },
  nextChatNumber: {
    type: Number,
    default: 0,
  },
  dateCreated: {
    type: Date,
    default: Date.now,
  }, 
  chats: {
    type: [Schema.Types.ObjectId],
    ref: 'Chat'
  }, 
  userMatches: {
    type: [Schema.Types.ObjectId],
    ref: 'User'
  }, 
  passwordResetToken:{
    type: String,
    default: null
  },
  
  unreadMessages: {
    type: Number,
    default: 0
  },
});

userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

// Hash the password before saving it to the database
userSchema.pre('save', async function (next) { 
  if (this.isNew || this.isModified('password')){ 
    
    // Generate a salt
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } 
  
});

module.exports = mongoose.model('User', userSchema);
 