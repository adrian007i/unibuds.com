const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const messageSchema = new mongoose.Schema({

  chat: {
    type: Schema.Types.ObjectId,
    ref: "Chat",
    required: [true, "Required"]
  }, 
  sender: {
    type: Number, 
    required: [true, "Required"]
  }, 
  msg: {
    type: String,
    required: [true, "Required"],
    maxlength: [200, "Max Length Exceeded"],
  }, 
});

module.exports = mongoose.model("Message", messageSchema);