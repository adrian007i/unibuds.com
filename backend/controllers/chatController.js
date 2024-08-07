const Chat = require('../models/Chat');
const mongoose = require('mongoose');
const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

const MAX_MESSAGES = 3;

/**
 * @desc    Get all chats for a particular user
 * @access  Private 
 */
module.exports.get_chats = async (req, res) => {

    const _id = new mongoose.Types.ObjectId(req.user._id);
    // await sleep(1000)
    const chats = await Chat
        .find({
            $or: [{ user1: _id }, { user2: _id }]
        })
        .skip(0)
        .limit(10)
        .sort({ 'lastMessage': 'desc' })
    res.status(200).json({ 'success': true, 'chats': chats });

}

// /**
//  * @desc    Get all messages for a particular user
//  * @access  Private 
//  */
// module.exports.get_messages = async (req, res) => {


//     const chat_id = new mongoose.Types.ObjectId(req.params.chat_id);
//     const messages = await Chat.findById(chat_id);

//     // ensure user is able to access the chat
//     if(messages.user1._id.toString() === req.user._id || messages.user2._id.toString() === req.user._id)
//         res.status(200).json({ 'success': true, 'messages': messages });
//     else
//         res.status(400).json({'success': false, error: 'Not authorized'});

// }

 