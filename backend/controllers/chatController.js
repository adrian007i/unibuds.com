const Chat = require('../models/Chat');
const User = require('../models/User')
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

module.exports.generateNewChat = async (req, res) => {

    const my_user_id = new mongoose.Types.ObjectId(req.user._id);
    // await sleep(1000)
    try {
        const usersCount = await User.countDocuments({});

        var random = Math.floor(Math.random() * usersCount)
        const randomUser = await User
            .findOne({ _id: { $ne: my_user_id } })
            .skip(random)
            .select(['_id', 'firstName', 'lastName', 'gender', 'campusLocation', 'major', 'bio', 'profilePicture'])
        console.log(randomUser);

        res.status(200).json({ 'success': true, 'user': randomUser });
    } catch {
        res.status(400).json({ 'success': false });
    }

}

module.exports.acceptNewChat = async (req, res) => {

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

