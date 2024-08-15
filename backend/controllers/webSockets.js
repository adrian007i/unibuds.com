const mongoose = require('mongoose');
const Chat = require('../models/Chat'); 

const storeMessage = async (message, user, status) => {

    try { 
        let chat;

        if (message.chatId) {

            const chatId = new mongoose.Types.ObjectId(message.chatId);

            chat = await Chat.findById(chatId); 
            if (!chat) throw ('Invalid Chat ID') 

            // DETERMINE THE SENDER OF THE MESSAGE  
            const sender = (user === chat.user1.toString() ? 1 : 2);

            // STORE THE MESSAGE IN THE NEXT CIRCULAR ARRAY POSITION
            chat.messages.push({ sender: sender, msg: message.body }); 

            chat.save();
        }
    } catch (error) {}

};


module.exports = storeMessage;