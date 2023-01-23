//Controllers
const authController = require("@controllers/auth");

//Middleware
const { verifyToken } = require("@middlewares/auth");

//Validator
const { parallelValidator } = require("@helpers/validator");

//Validation
const authValidation = require("@requests/auth");

//Router
const router = require("express").Router();

//Auth
router
  .route("/register")
  .post(parallelValidator(authValidation.register), authController.register);
router
  .route("/login")
  .post(parallelValidator(authValidation.login), authController.login);

module.exports = router;
