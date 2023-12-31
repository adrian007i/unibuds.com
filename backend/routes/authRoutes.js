const { Router } = require("express");
const authControler = require("../controllers/authController");
const protect = require("../middleware/authMiddleware")

const router = Router(); 
router.post("/signup" , authControler.signup_post);
// router.post("/profile" , passport.authenticate('jwt', { session: false }), authControler.update_profile_info);
router.post("/login" , authControler.login_post);
router.post("/logout" , authControler.logout_post);

router.get("/profile" ,protect, authControler.update_profile_info)
module.exports = router;