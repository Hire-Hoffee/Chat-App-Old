const bcrypt = require('bcrypt');
const jwtCreate = require('../config/JSONWebTokens');
const { body, validationResult } = require('express-validator');

const User = require('../models/userSchema');

module.exports = {
  signUpGet: (req, res) => {
    res.render('sign_up', { server_message: req.cookies?.server_message, user: req.cookies?.user_name });
  },
  signUpPost: [
    body('user_email')
      .trim()
      .isEmail()
      .withMessage('email must contain @ sign')
      .isLength({ min: 5, max: 50 })
      .withMessage('email must be from 5 to 50 characters long')
      .notEmpty()
      .withMessage('email cannot be empty'),
    body('user_name')
      .trim()
      .isLength({ min: 5, max: 50 })
      .withMessage('user name must be from 5 to 50 characters long')
      .notEmpty()
      .withMessage('user name cannot be empty'),
    body('user_password')
      .isLength({ min: 5, max: 50 })
      .withMessage('password must be from 5 to 50 characters long')
      .notEmpty()
      .withMessage('password cannot be empty'),

    async (req, res, next) => {
      const validationErrors = validationResult(req);
      if (!validationErrors.isEmpty()) {
        return res
          .cookie('server_message', validationErrors.array(), { maxAge: 5000 })
          .redirect('sign_up');
      }

      try {
        const user_data = {
          user_email: req.body.user_email,
          user_password: req.body.user_password,
          user_name: req.body.user_name,
          user_avatar: req.file?.filename,
        }

        const findUser = await User.findOne({ user_email: user_data.user_email });
        if (findUser) {
          return res
            .cookie('server_message', 'Пользователь с таким Email уже зарегистрирован', { maxAge: 5000 })
            .redirect('sign_up');
        }
        user_data.user_password = bcrypt.hashSync(user_data.user_password, 7);
        await User.create(user_data);
        res
          .cookie('server_message', 'Регистрация прошла успешно', { maxAge: 5000 })
          .redirect('login');
      } catch (error) {
        next(error);
      }
    }
  ],
  loginGet: (req, res) => {
    res.render('login', { server_message: req.cookies?.server_message, user: req.cookies?.user_name });
  },
  loginPost: [
    body('user_email')
      .trim()
      .isEmail()
      .withMessage('email must contain @ sign')
      .notEmpty()
      .withMessage('email cannot be empty'),

    async (req, res, next) => {
      const validationErrors = validationResult(req);
      if (!validationErrors.isEmpty()) {
        return res
          .cookie('server_message', validationErrors.array(), { maxAge: 5000 })
          .redirect('login');
      }

      try {
        const data = req.body;
        const findUser = await User.findOne({ user_email: data.user_email });
        if (!findUser) {
          return res
            .cookie('server_message', 'Пользователь не найден', { maxAge: 5000 })
            .redirect('login');
        }
        const validPassword = bcrypt.compareSync(data.user_password, findUser.user_password);
        if (!validPassword) {
          return res
            .cookie('server_message', 'Неверный пароль', { maxAge: 5000 })
            .redirect('login');
        }
        const accessToken = jwtCreate.accessToken({ id: findUser._id });
        const refreshToken = jwtCreate.refreshToken({ id: findUser._id });
        await User.findOneAndUpdate({ user_email: data.user_email }, { token: refreshToken });
        res
          .cookie('user_name', findUser.user_name, { maxAge: 60000 * 60 * 72 })
          .cookie('user_avatar', findUser.user_avatar, { maxAge: 60000 * 60 * 72 })
          .cookie('token', 'Bearer ' + accessToken, { maxAge: 60000 * 60 * 72, httpOnly: true, signed: true })
          .redirect('/main');
      } catch (error) {
        next(error);
      }
    }
  ],
  logoutGet: (req, res) => {
    res.render('logout', { server_message: req.cookies?.server_message, user: req.cookies?.user_name })
  },
  logoutPost: async (req, res, next) => {
    try {
      const userName = req.cookies.user_name;
      await User.findOneAndUpdate({ user_name: userName }, { token: 'undefined' });
      res
      .clearCookie("user_name")
      .clearCookie("token")
      .redirect('/auth/login');
    } catch (error) {
      next(error);
    }
  }
}
