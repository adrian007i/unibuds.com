const mongoose = require('mongoose');
const Chat = require('../models/Chat');
const MAX_MESSAGES = 10;

const storeMessage = async (message, user, status) => {  
    
    try {
        let msgIndex = 0;
        let chat;

        if (message.chatId) {
            
            const chatId = new mongoose.Types.ObjectId(message.chatId);

            // check an see if a chat convo exist between the 2 users , TODO use redis to speed up this
            chat = await Chat.findById(chatId);
            msgIndex = chat.msgIndex;
            if (!chat) throw ('Invalid Chat ID')

        } else {
            const user1 = new mongoose.Types.ObjectId(user);
            const user2 = new mongoose.Types.ObjectId(message.reciever);
            chat = new Chat({ user1, user2 });
        }

        // DETERMINE THE SENDER OF THE MESSAGE  
        const sender = (user === chat.user1.toString() ? 1 : 2); 
        
        // STORE THE MESSAGE IN THE NEXT CIRCULAR ARRAY POSITION
        chat.messages[msgIndex] = { sender: sender, msg: message.body }

        // WE ARE LIMITING MESSAGES TO A FIXED AMOUNT DUE TO SERVER COST
        // HERE WE DETERMINE THE NEXT INDEX POSITION WHEN THE CIRCULAR ARRAY BECOMES FULL
        if (msgIndex === MAX_MESSAGES)
            chat.msgIndex = 0
        else
            chat.msgIndex++;

        chat.save(); 
    } catch (error) {
        console.log(error) 
    }

};


module.exports = storeMessage;