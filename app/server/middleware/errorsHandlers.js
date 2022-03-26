const createError = require('http-errors');

const notFoundHandler = function (req, res, next) {
  next(createError(404));
}

const errorsHandler = function (err, req, res, next) {
  console.log(err);

  const status = err.status || 500;

  res
    .status(err.status || 500)
    .render('errorPage', { error: err, status, user: req.cookies?.user_name });
}

module.exports = { errorsHandler, notFoundHandler };