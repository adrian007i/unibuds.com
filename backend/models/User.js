const mongoose = require("mongoose");
const { isEmail } = require("validator");
const bcrypt = require("bcrypt"); 

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
    unique: [true, "Email already registered"],
    validate: [isEmail, "Invalid email format"],
  },
  password: {
    type: String,
    required: [true, "Password is required"],
    minlength: [6, "Password too short"],
  },
  profile: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Profile"
  }
});

// Hash the password before saving it to the database
userSchema.pre("save", async function (next) {
  // Generate a salt
  const salt = await bcrypt.genSalt();
  this.password = await bcrypt.hash(this.password, salt); 
  next();
});

module.exports = mongoose.model("User", userSchema);