const Chat = require('../models/Chat');
const mongoose = require('mongoose');
/**
 * @desc    Get all chats for a particular user
 * @access  Private 
 */
module.exports.get_chats = async (req, res) => {

    const _id = new mongoose.Types.ObjectId(req.user._id);

    const chats = await Chat.find({
        $or: [{ user1: _id }, { user2: _id }]
    });

    res.status(200).json({ 'success': true, 'chats': chats });
}

/**
 * @desc    Send a message from User A to User B
 * @access  Private 
 */
module.exports.send_message = async (req, res) => {

    // deterime who will recieve the message
    const user_key = req.user.id === req.body.user1 ? req.body.user2 : req.body.user1;

    try {
        // use web socket to broadcast the message
        req.app.locals.clients[user_key].forEach((client) => client.send(req.body.message));
    } catch {
        // send and email here
        console.log('User Not Currently Online')
    }

    try {
        let chat;  
        if (req.body.chat_id) {

            const chat_id = new mongoose.Types.ObjectId(req.body.chat_id);

            // check an see if a chat convo exist between the 2 users , TODO use redis to speed up this
            chat = await Chat.findById(chat_id);
            if (!chat) throw ("Invalid Chat ID")

        } else { 
            const user1 = new mongoose.Types.ObjectId(req.body.user1);
            const user2 = new mongoose.Types.ObjectId(req.body.user2);
            chat = new Chat({ user1, user2 });
        }

        chat.last_message = Date.now();
        await chat.save();

        res.status(201).json({ 'success': true});

    } catch (error) {  
        console.log(error)
        res.status(400).json({ 'error': 'Fail to Send' });
    }
}