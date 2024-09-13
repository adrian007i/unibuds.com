const Chat = require('../models/Chat');
const User = require('../models/User')
const mongoose = require('mongoose');
const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

const MAX_MESSAGES = 40;

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
        .select({
            messages: { $slice: - MAX_MESSAGES }
        })
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

    try {
        const user = await User.findById(req.user._id);

        const usersCount = await User.countDocuments({});

        const nextUser = await User
            .findOne()
            .skip(user.nextChatNumber)
            .select(['_id', 'firstName', 'lastName', 'gender', 'campusLocation', 'major', 'bio', 'profilePicture'])

        
        // will eventually implement a better queuing system
        user.nextChatNumber = user.nextChatNumber + 1;
        if (user.nextChatNumber >= usersCount)
            user.nextChatNumber = 0;

        await user.save();

        res.status(200).json({ 'success': true, 'user': nextUser });
    } catch (e) {
        res.status(400).json({ 'success': false });
    }

}

/**
 * @desc    User accepts the random chat
 * @access  Private 
 */
module.exports.acceptNewChat = async (req, res) => {

    try {
        const user1 = new mongoose.Types.ObjectId(req.user._id);
        const user2 = new mongoose.Types.ObjectId(req.params.chat_id);
        const last_messsage = Date.now();
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


/**
 * @desc    Get a single chag
 * @access  Private 
 */
module.exports.get_chat = async (req, res) => {

    try {
        const chat = await Chat
            .findById(req.params.id)
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

        // verify the user id is associated with the chat
        if (chat.user1._id != req.user._id && chat.user2._id != req.user._id)
            throw new Error("You are not authorized to access this chat");

        res.status(200).json(chat);

    } catch {
        res.status(400).json({ 'success': false });
    }

}