const jwt = require('jsonwebtoken');
const User = require('../models/userSchema');
const jwtCreate = require('../config/JSONWebTokens');

const authMiddleware = async function (req, res, next) {

  try {
    const token = req.signedCookies.token?.split(' ')[1];
    if (!token) {
      return res
        .cookie('server_message', 'Пользователь не авторизован', { maxAge: 5000 })
        .redirect('/auth/login');
    }
    jwt.verify(token, process.env.SECRET_JWT_ACCESS);
    next();
  } catch (error) {
    if (error.message == 'jwt expired') {
      try {
        const userName = req.cookies.user_name;
        const findUser = await User.findOne({ user_name: userName });
        jwt.verify(findUser.token, process.env.SECRET_JWT_REFRESH);
        const accessToken = jwtCreate.accessToken({ id: findUser._id });
        res.cookie('token', 'Bearer ' + accessToken, { maxAge: 60000 * 60 * 25, httpOnly: true, signed: true });
        return next();
      } catch (error) {
        console.log(error);
        return res
          .cookie('server_message', 'Что - то пошло не так. Пожалуйста войдите еще раз', { maxAge: 5000 })
          .redirect('/auth/login');
      }
    }
    console.log(error);
    res
      .cookie('server_message', 'Что - то пошло не так. Пожалуйста войдите еще раз', { maxAge: 5000 })
      .redirect('/auth/login');
  }

}

module.exports = authMiddleware;