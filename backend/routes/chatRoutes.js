const { Router } = require('express');
const chatController = require('../controllers/chatController');
const {protect} = require('../middleware/authMiddleware'); 


const router = Router();  

router.get('/get_chats' , protect ,  chatController.get_chats); 
router.get('/get_chat/:id' , protect ,  chatController.get_chat); 
router.get('/generate_new_chat' , protect ,  chatController.generateNewChat); 
router.post('/accept_new_chat/:chat_id' , protect ,  chatController.acceptNewChat); 
router.post('/block_user' , protect ,  chatController.block_user); 
// router.get('/get_messages/:chat_id' , protect ,  chatController.get_messages);  

module.exports = router;