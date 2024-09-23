const mongoose = require('mongoose');
const Chat = require('../models/Chat');

const storeMessage = async (message, user, recieverOnline) => {

    try {
        if (message.chatId) {


            await Chat.findByIdAndUpdate(message.chatId, {
                $push: { messages: { sender: message.amIUser1 ? 1 : 2, msg: message.body } }
            },
                { select: { messages: 0, _id: 0, user1: 0, user2: 0, lastMessage:0, msgIndex:0 , __v : 0} }
            ).exec()
            
        }
    } catch (error) { }

};


module.exports = storeMessage;