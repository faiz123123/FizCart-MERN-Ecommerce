const express = require("express");
const router = express.Router();
const {registerUser, loginUser, getUsers, verifyUserOtp, resendVerificationOtp}= require("../controller/authController");
const {protect} = require("../middleware/authMiddleware");
const {admin} = require("../middleware/adminMiddleware");
router.post( "/register",registerUser);
router.post( "/login",loginUser);
router.post("/verify-otp", verifyUserOtp);
router.post("/resend-otp", resendVerificationOtp);

router.get( "/users",protect, admin, getUsers);
module.exports = router;