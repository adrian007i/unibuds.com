const mongoose = require('mongoose');
const Schema = mongoose.Schema; 

// STORES USER1 & USER2 OF THE CHAT
const universitiesSchema = new Schema({
  name: {
    type: String,
    required: [true, 'Required']
  }, 
  users: {
    type:[Schema.Types.ObjectId],
    default:[]
  },
  userSize:{
    type: Number,
    default:0
  }
}); 
 

module.exports = mongoose.model('Universities', universitiesSchema);