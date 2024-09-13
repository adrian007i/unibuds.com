const mongoose = require('mongoose');
const Schema = mongoose.Schema; 

// STORES USER1 & USER2 OF THE CHAT
const universitiesSchema = new Schema({
  name: {
    type: String,
    required: [true, 'Required']
  }, 
  users: {
    type:[Schema.Types.ObjectId]
  }
}); 
 

module.exports = mongoose.model('Universities', universitiesSchema);