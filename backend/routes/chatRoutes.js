const { Router } = require('express');
const chatController = require('../controllers/chatController');
const {protect} = require('../middleware/authMiddleware'); 


const router = Router();  

router.get('/get_chats' , protect ,  chatController.get_chats); 
router.get('/get_messages/:chat_id' , protect ,  chatController.get_messages); 
router.post('/send_message' , protect ,  chatController.send_message); 

module.exports = router;