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

    const chats = await Chat
        .find({
            $or: [{ user1: _id }, { user2: _id }]
        })
        .skip(0)
        .limit(10)
        .sort({ 'lastMessage': 'desc' })
        .populate([
            {
                path: 'user1',
                select: 'firstName profilePicture',
            },
            {
                path: 'user2',
                select: 'firstName profilePicture',
            }
        ])
    res.status(200).json({ 'success': true, 'chats': chats });

}

/**
 * @desc    Generates a random chat for the user
 * @access  Private 
 */
module.exports.generateNewChat = async (req, res) => {

    const my_user_id = new mongoose.Types.ObjectId(req.user._id);
    try {
        const usersCount = await User.countDocuments({});

        var random = Math.floor(Math.random() * usersCount)
        const randomUser = await User
            .findOne({ _id: { $ne: my_user_id } })
            .skip(random)
            .select(['_id', 'firstName', 'lastName', 'gender', 'campusLocation', 'major', 'bio', 'profilePicture'])

        res.status(200).json({ 'success': true, 'user': randomUser });
    } catch {
        res.status(400).json({ 'success': false });
    }

}

/**
 * @desc    User accepts the random chat
 * @access  Private 
 */
module.exports.acceptNewChat = async (req, res) => {
    console.log('acepting');

    try {
        const user1 = new mongoose.Types.ObjectId(req.user._id);
        const user2 = new mongoose.Types.ObjectId(req.params.chat_id);
        const last_messsage = Date.now()
        const chat = await Chat.create({ user1, user2, last_messsage }); 
        
        res.status(200).json(
            {
                'success': true,
                'newChat': await chat.populate([
                    {
                        path: 'user1',
                        select: 'firstName profilePicture',
                    },
                    {
                        path: 'user2',
                        select: 'firstName profilePicture',
                    }
                ])
            });

    } catch {
        res.status(400).json({ 'success': false });
    }
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

