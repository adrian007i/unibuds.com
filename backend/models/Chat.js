const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const chat = new mongoose.Schema({

  user1: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: [true, "Required"]
  },
  user2: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: [true, "Required"]
  },
  msg: {
    type: String,
    required: [true, "Required"],
    maxlength: [200, "Max Length Exceeded"],
  },
  dateCreated: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Chat", chat);