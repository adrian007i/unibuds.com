const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const chat = new mongoose.Schema({
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
  last_message: {
    type: Date, 
    required: true 
  },
});

module.exports = mongoose.model('Chat', chat);