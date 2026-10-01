const express = require('express');
const router = express.Router();
const { getProfile, updateProfile, downloadResumeFile } = require('../controllers/profileController');
const { protect } = require('../middlewares/authMiddleware');

router.get('/', getProfile);
router.get('/resume', downloadResumeFile);
router.put('/', protect, updateProfile);

module.exports = router;
