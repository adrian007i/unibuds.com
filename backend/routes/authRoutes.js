const { Router } = require('express');
const authControler = require('../controllers/authController');
const {protect} = require('../middleware/authMiddleware'); 

const multer = require('multer'); 
const storage = multer.memoryStorage();
const upload = multer({ storage });

const router = Router(); 
router.post('/register', upload.single('profilePicture'), authControler.register); 
router.post('/login' , authControler.login);

router.get('/get_user' , protect , authControler.get_user);
router.post('/set_user' , protect , upload.single('profilePicture'), authControler.set_user);
router.post('/get_universities' , authControler.get_universities);
router.post('/send_reset_url', authControler.send_reset_url);
module.exports = router;