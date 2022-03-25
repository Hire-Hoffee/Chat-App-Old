const multer = require('multer');

const avatarUpload = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'app/client/public/images/usersAvatars');
  },
  filename: (req, file, cb) => {
    cb(null, Math.floor(Math.random() * 10000) + '_' + file.originalname);
  }
})

module.exports = avatarUpload;