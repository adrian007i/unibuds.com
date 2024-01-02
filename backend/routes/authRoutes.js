const { Router } = require("express");
const authControler = require("../controllers/authController");
const protect = require("../middleware/authMiddleware");
const storage = require("../middleware/storeImage");
// const upload = multer({ storage: storage });


const router = Router(); 
router.post("/signup" , authControler.signup_post); 
router.post("/login" , authControler.login_post);
router.post("/logout" , authControler.logout_post);

router.post("/profile" ,protect ,  authControler.update_profile_info)
module.exports = router;