const express = require('express');
const { sendJobAlert } = require('../controllers/emailController');
const { protect } = require('../middleware/authMiddleware');
const router = express.Router();

router.post('/send', protect, sendJobAlert);

module.exports = router;
