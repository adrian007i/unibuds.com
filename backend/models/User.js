const mongoose = require("mongoose");
const {isEmail} = require("validator");

const userSchema = new mongoose.Schema({
  first_name: {
    type: String,
    required: [true, "First name is required"],
    minlength: [2, "First name too short"],
  },
  last_name: {
    type: String,
    required: [true, "Last name is required"],
    minlength: [2, "Last name too short"],
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    unique:  [true, "Email already registered"],
    validate: [isEmail, "Invalid email format"],
  },
  password: {
    type: String,
    required: [true, "Password is required"],
    minlength: [6, "Password too short"],
  },
});
module.exports = mongoose.model("User", userSchema);