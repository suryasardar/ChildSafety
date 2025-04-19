const express = require('express');
const router = express.Router();
const { signup, signin, signout } = require('../controllers/authController');
const { protect } = require('../middleware/auth');

router.post('/signup', signup);
router.post('/signin', signin);
router.get('/signout', protect, signout);

module.exports = router;