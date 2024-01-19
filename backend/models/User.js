const mongoose = require("mongoose");
const { isEmail } = require("validator");
const bcrypt = require("bcrypt"); 

const userSchema = new mongoose.Schema({
  first_name: {
    type: String,
    required: [true, "Required"],
    minlength: [2, "Too Short"],
  },
  last_name: {
    type: String,
    required: [true, "Required"],
    minlength: [2, "Too Short"],
  },
  email: {
    type: String,
    required: [true, "Required"],
    unique: [true, "Email Exist"],
    validate: [isEmail, "Invalid Email"],
  },
  password: {
    type: String,
    required: [true, "Required"],
    minlength: [6, "At least 6 characters"],
  },
  profile: {
    type: {
      bio: {
        type: String,
        maxlength: [300, "Max Length Exceeded"],
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
        required: [true, "Age required"],
      },
      gender: {
        type: String,
        enum: ["male", "female", "other"],
        default: "other",
      },
      city: {
        type: String,
      },
    },
    default: {
      bio: "",
      profilePicture: "None", 
      university: "",
      major: "",
      age: 0,
      gender: "other",
      city: "",
    },
  },
  profileSetup : {
    type: Boolean,
    default: false 
  }

});

userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

// Hash the password before saving it to the database
userSchema.pre("save", async function (next) {
  // Generate a salt
  const salt = await bcrypt.genSalt();
  this.password = await bcrypt.hash(this.password, salt); 
  next();
});

module.exports = mongoose.model("User", userSchema);