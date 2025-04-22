const express = require('express');
const router = express.Router();
const userController = require('../controller/userController');
const auth = require('../middleware/auth');

// router.get('/', auth, userController.userInfo);

module.exports = router;