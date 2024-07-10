const Chat = require("../models/Chat");
const mongoose = require('mongoose');

/**
 * @desc    Login a user
 * @access  Public 
 */
module.exports.get_chats = async (req, res) => {

    const _id = new mongoose.Types.ObjectId(req.body._id);

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

    try {

        const user1 = new mongoose.Types.ObjectId(req.body.user1);
        const user2 = new mongoose.Types.ObjectId(req.body.user2);
        const new_chat = false;

        // check an see if a chat convo exist between the 2 users
        const chat = await Chat.findOne({
            $or: [
                { $and: [{ user1: user1 }, { user2: user2 }] },
                { $and: [{ user1: user2 }, { user2: user1 }] }
            ]

        });



        // if it does not exist, store their user ids in the database
        if (!chat) {
            new_chat = true
            chat = new Chat({ user1, user2 });
        }

        chat.last_message = Date.now();
        await chat.save();

        res.status(201).json({ 'success': true, 'new_chat': new_chat });

    } catch (error) {
        console.log(error);
        res.status(400).json({ 'error': 'Fail to Send' });
    }
}