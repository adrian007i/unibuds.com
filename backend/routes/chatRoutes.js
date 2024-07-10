const { Router } = require('express');
const chatController = require('../controllers/chatController');
const protect = require('../middleware/authMiddleware'); 


const router = Router();  

router.get('/get_chats' , protect ,  chatController.get_chats); 
router.post('/send_message' , protect ,  chatController.send_message); 

module.exports = router;