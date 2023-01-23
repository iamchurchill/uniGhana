const { Sequelize, User } = require("../models");
const { check, body } = require("express-validator");

module.exports.register = [
  body("email")
    .exists({ checkNull: true, checkFalsy: true })
    .withMessage("email is required")
    .normalizeEmail({ all_lowercase: false, gmail_remove_dots: false })
    .isEmail()
    .withMessage("email address required")
    .trim()
    .custom((value) => {
      return User.findOne({
        attributes: ["email"],
        where: {
          email: {
            [Sequelize.Op.eq]: value,
          },
        },
      })
        .then((user) => {
          if (user) {
            return Promise.reject("email address is taken!");
          }
        })
        .catch((error) => {
          return Promise.reject(error.toString());
        });
    }),
  body("password")
    .exists({ checkNull: true, checkFalsy: true })
    .withMessage("password is required")
    .isStrongPassword({
      minLength: 8,
      minUppercase: 1,
      minLowercase: 1,
      minNumbers: 1,
      minSymbols: 1,
    })
    .withMessage(
      "password should be greater than 8 and contain at least one uppercase letter, one lowercase letter, one number, and one special character"
    ),
  body(
    "password_confirm",
    "Your confirmation password must match the password field"
  )
    .exists({ checkNull: true, checkFalsy: true })
    .withMessage("confirmation password is required")
    .custom((value, { req }) => value === req.body.password),
];

module.exports.login = [
  check("email").exists({ checkNull: true, checkFalsy: true }),
  check("password").exists({ checkNull: true, checkFalsy: true }),
];
