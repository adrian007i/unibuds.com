const { Router } = require("express");
const authControler = require("../controllers/authController");
const protect = require("../middleware/authMiddleware");
const storage = require("../middleware/storeImage");
// const upload = multer({ storage: storage });


const router = Router(); 
router.post("/signup" , authControler.signup_post); 
router.post("/login" , authControler.login_post);

router.get("/get_profile" , protect ,  authControler.get_profile_info);
router.post("/set_profile" , protect ,  authControler.set_profile_info);
module.exports = router;