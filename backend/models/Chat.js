const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// SCHEMA DEFINATION FOR A MESSAGE
const messageSchema = new mongoose.Schema({
  sender: {
    type: Number,
    required: [true, 'Required']
  },
  msg: {
    type: String,
    required: [true, 'Required'],
    maxlength: [200, 'Max Length Exceeded'],
  },
  timestamp: {
    type: Date,
    default: Date.now
  }
});

// STORES USER1 & USER2 OF THE CHAT
const chatSchema = new Schema({
  user1: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'Required']
  },
  user2: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'Required']
  },
  msgIndex: {
    type: Number,
    default: 0
  },
  messages: {
    type: [messageSchema]
  },
  lastMessage: {
    type: Date,
  },
  userA_Unread: {
    type: Number,
    default: 0
  },
  userB_Unread: {
    type: Number,
    default: 0
  }
});

chatSchema.pre('save', function (next) {
  this.lastMessage = Date.now();
  next();
});

module.exports = mongoose.model('Chat', chatSchema);