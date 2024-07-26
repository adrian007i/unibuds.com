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

/**
 * @desc    Send a message from User A to User B
 * @access  Private 
 */
module.exports.send_message = async (req, res) => {

    // DETERMINE THE RECIEVER OF THE MESSAGE
    const userKey = req.user.id === req.body.user1 ? req.body.user2 : req.body.user1;

    try {
        // use web socket to broadcast the message
        req.app.locals.clients[userKey].forEach((client) => client.send(req.body.message));
    } catch {
        // send and email here
        console.log('User Not Currently Online')
    }

    try {
        let msgIndex = 0;
        let chat;

        if (req.body.chatId) {

            const chatId = new mongoose.Types.ObjectId(req.body.chatId);

            // check an see if a chat convo exist between the 2 users , TODO use redis to speed up this
            chat = await Chat.findById(chatId);
            msgIndex = chat.msgIndex;
            if (!chat) throw ('Invalid Chat ID')

        } else {
            const user1 = new mongoose.Types.ObjectId(req.body.user1);
            const user2 = new mongoose.Types.ObjectId(req.body.user2);
            chat = new Chat({ user1, user2 });
        }

        // DETERMINE THE SENDER OF THE MESSAGE
        const sender = (req.user._id === req.body.user1 ? 1 : 2);

        // STORE THE MESSAGE IN THE NEXT CIRCULAR ARRAY POSITION
        chat.messages[msgIndex] = { sender: sender, msg: req.body.message }

        // WE ARE LIMITING MESSAGES TO A FIXED AMOUNT DUE TO SERVER COST
        // HERE WE DETERMINE THE NEXT INDEX POSITION WHEN THE CIRCULAR ARRAY BECOMES FULL
        if (msgIndex === MAX_MESSAGES)
            chat.msgIndex = 0
        else
            chat.msgIndex++;

        await chat.save();

        res.status(201).json({ 'success': true });

    } catch (error) {
        console.log(error)
        res.status(400).json({ 'error': 'Fail to Send' });
    }
}