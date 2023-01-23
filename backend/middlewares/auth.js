const jwt = require("jsonwebtoken");
const { errorResponse } = require("../helpers/response");
const { JWT_SECRET_KEY, JWT_ALGORITHM } = process.env;

module.exports.verifyToken = (request, response, next) => {
  const token = request.headers.authorization.split(" ")[1];

  if (!token) {
    return response
      .status(401)
      .json(errorResponse("You are not authorized to access this resources!"));
  }

  jwt.verify(
    token,
    JWT_SECRET_KEY,
    { algorithm: JWT_ALGORITHM },
    (error, user) => {
      if (error) return next(error);
      request.user = user;
    }
  );
  return next();
};
