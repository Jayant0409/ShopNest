const express = require('express');
const app = express();
const { register, login, getUsers, verifyEmail, forgotPassword, verifyResetOtp, resetPassword } = require('../controllers/authController.js');
const { protect } = require('../middleware/authMiddleware.js');
const { admin } = require('../middleware/adminMiddleware.js');

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.get('/users', protect, admin, getUsers);
router.post("/verify-email", verifyEmail);
router.post("/forgot-password", forgotPassword);
router.post("/verify-reset-otp", verifyResetOtp);
router.post("/reset-password", resetPassword);

 // Add this line for email verification

module.exports = router;