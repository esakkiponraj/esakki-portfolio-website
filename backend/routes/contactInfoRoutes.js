const express = require('express');
const router = express.Router();
const { getContactInfo, updateContactInfo } = require('../controllers/contactInfoController');
const { protect } = require('../middlewares/authMiddleware');

router.get('/', getContactInfo);
router.put('/', protect, updateContactInfo);

module.exports = router;
