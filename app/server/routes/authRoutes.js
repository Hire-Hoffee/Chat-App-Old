const express = require('express');
const router = express.Router()

const authControllers = require('../controllers/authControllers');

router.route('/sign_up').get(authControllers.signUpGet).post(authControllers.signUpPost);
router.route('/login').get(authControllers.loginGet).post(authControllers.loginPost);
router.route('/logout').get(authControllers.logoutGet).post(authControllers.logoutPost);

module.exports = router;