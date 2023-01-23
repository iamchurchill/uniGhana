const bcrypt = require("bcrypt");
const { getToken } = require("@helpers/token");
const { successResponse, errorResponse } = require("@helpers/response");
const { Sequelize, User } = require("@models");

module.exports.register = (request, response, next) => {
  const { email, password } = request.body;

  User.findOne({
    where: {
      email: {
        [Sequelize.Op.eq]: email,
      },
    },
  })
    .then((user) => {
      if (user) {
        return response
          .status(409)
          .json(errorResponse("User already exist. Please Login"));
      }
      return bcrypt
        .hash(password, 10)
        .then((encryptedPassword) => {
          return User.create({
            email: email.toLowerCase(),
            password: encryptedPassword,
          })
            .then((user) => {
              user.accessToken = getToken(user, false);
              return response.status(201).json(successResponse("Login successful", user));
            })
            .catch((error) => {
              return next(error);
            });
        })
        .catch((error) => {
          return next(error);
        });
    })
    .catch((error) => {
      return next(error);
    });
};

module.exports.login = (request, response, next) => {
  const { email, password } = request.body;

  User.findOne({
    where: {
      email: {
        [Sequelize.Op.eq]: email,
      },
    },
  })
    .then((user) => {
      if (!user) {
        return response.status(409).json(errorResponse("User not found"));
      }
      return bcrypt
        .compare(password, user.password)
        .then((matches) => {
          if (!matches) {
            return response
              .status(400)
              .json(errorResponse("Invalid Credentials"));
          }
          user.accessToken = getToken(user, false);
          user.refreshToken = getToken(user);

          console.log(user.accessToken);
          return response.status(200).json(successResponse("", user));
        })
        .catch((error) => {
          return next(error);
        });
    })
    .catch((error) => {
      return next(error);
    });
};
