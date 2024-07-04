const { Router } = require("express");
const chatController = require("../controllers/chatController");
const protect = require("../middleware/authMiddleware"); 


const router = Router();  

router.get("/get_people" , protect ,  chatController.get_people);
router.get("/get_chats" , protect ,  chatController.get_chats);

router.post("/set_message" , protect ,  chatController.set_message);
router.get("/get_messages" , protect ,  chatController.get_messages);
module.exports = router;