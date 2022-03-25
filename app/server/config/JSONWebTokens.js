const jwt = require('jsonwebtoken');

module.exports = {
  accessToken: (payload) => {
    const token = jwt.sign(payload, process.env.SECRET_JWT_ACCESS, {expiresIn: "12h"});
    return token;
  },
  refreshToken: (payload) => {
    const token = jwt.sign(payload, process.env.SECRET_JWT_REFRESH, {expiresIn: "720h"});
    return token;
  }
}