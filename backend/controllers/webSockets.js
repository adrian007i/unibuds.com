const mongoose = require('mongoose');
const Chat = require('../models/Chat');

module.exports.storeMessage = async (message, user, recieverOnline) => {

    try {
        if (message.chatId) {

            // if the reciever is not online, we specify they have unread messages
            if (!recieverOnline) {
                Chat.findByIdAndUpdate(message.chatId, {
                    $push: { messages: { sender: message.amIUser1 ? 1 : 2, msg: message.body } },
                    [`user${message.amIUser1 ? 'B' : 'A'}_Unread`]: true
                },
                    { select: ['_id'] }
                ).exec()
            }
            else {
                Chat.findByIdAndUpdate(message.chatId, {
                    $push: { messages: { sender: message.amIUser1 ? 1 : 2, msg: message.body } },
                },
                    { select: ['_id'] }
                ).exec()
            }
        }
    } catch (error) { }

};

module.exports.updateUnreadStatus = (data) => {

    try {

        const { userUnread, newUnread, chatId } = data; 
        
        Chat.findByIdAndUpdate(chatId, {
            [userUnread]: newUnread
        },
            { select: ['_id'] }
        ).exec()
    } catch (error) { 
        console.log(error); 
    }
}
