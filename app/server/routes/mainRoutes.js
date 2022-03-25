const express = require('express');
const router = express.Router();

const User = require('../models/userSchema');

const mainControllers = require('../controllers/mainControllers');
const auth = require('../middleware/authMiddleware');

router.route('/').get(auth, mainControllers.chatRoom);
router.route('/users').get(auth, mainControllers.users);
router.route('/users/find').get(auth, mainControllers.findUser);

router.route('/users/add_room/:room_with').post(auth, mainControllers.addRoom);


module.exports = router;