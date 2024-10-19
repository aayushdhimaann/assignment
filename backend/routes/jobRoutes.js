const express = require('express');
const { postJob } = require('../controllers/jobController');
const { protect } = require('../middleware/authMiddleware');
const router = express.Router();

router.post('/post', protect, postJob);

module.exports = router;
