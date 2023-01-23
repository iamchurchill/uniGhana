//Controllers
const homeController = require("@controllers/home");

//Router
const router = require("express").Router();

//Home
router.route("/").get(homeController.index);

module.exports = router;
