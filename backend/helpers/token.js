const jwt = require("jsonwebtoken");
const {
  JWT_ACCESS_TOKEN_SECRET_KEY,
  JWT_ACCESS_TOKEN_ALGORITHM,
  JWT_ACCESS_TOKEN_EXPIRES,
  JWT_REFRESH_TOKEN_SECRET_KEY,
  JWT_REFRESH_TOKEN_ALGORITHM,
  JWT_REFRESH_TOKEN_EXPIRES,
} = process.env;

module.exports.getToken = (user, refresh = true) => {
  return jwt.sign(
    { id: user.id, email: user.email },
    refresh ? JWT_REFRESH_TOKEN_SECRET_KEY : JWT_ACCESS_TOKEN_SECRET_KEY,
    {
      algorithm: refresh
        ? JWT_REFRESH_TOKEN_ALGORITHM
        : JWT_ACCESS_TOKEN_ALGORITHM,
      expiresIn: refresh ? JWT_REFRESH_TOKEN_EXPIRES : JWT_ACCESS_TOKEN_EXPIRES,
    }
  );
};
