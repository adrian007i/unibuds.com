const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true,
  }, 
  university: {
    type: String
  }, 
  profilePicture: {
    type: String, 
  },
  major: {
    type: String,
  },
  age: {
    type: Number,
  },
  city: {
    type: String,
  },
});

module.exports = mongoose.model("User", userSchema);