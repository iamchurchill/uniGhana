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
          .status(200)
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
              return response
                .status(201)
                .json(successResponse("Registered successfully", user));
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
        return response.status(200).json(errorResponse("User not found"));
      }
      return bcrypt
        .compare(password, user.password)
        .then((matches) => {
          if (!matches) {
            return response
              .status(200)
              .json(errorResponse("Invalid Credentials"));
          }
          const accessToken = getToken(user, false);
          const refreshToken = getToken(user);

          return response
            .status(200)
            .json(
              successResponse(
                "Logged in successfully",
                user,
                accessToken,
                refreshToken
              )
            );
        })
        .catch((error) => {
          return next(error);
        });
    })
    .catch((error) => {
      return next(error);
    });
};
