const express = require('express');
const router = express.Router();
const { register, login, setUsername } = require('../controllers/authController');

router.post('/register', register);
router.post('/login', login);
router.post('/set-username', setUsername);

module.exports = router;
