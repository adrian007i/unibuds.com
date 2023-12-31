const { Router } = require("express");
const authControler = require("../controllers/authController");
const passport = require('passport');

const router = Router(); 
router.post("/signup" , authControler.signup_post);
router.post("/profile" , passport.authenticate('jwt', { session: false }), authControler.update_profile_info);
router.post("/login" , authControler.login_post);

module.exports = router;