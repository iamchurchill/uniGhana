require("module-alias/register");
require("dotenv").config();
const express = require("express");
const path = require("path");
const cors = require("cors");
const helmet = require("helmet");
const actuator = require("express-actuator");
const { rateLimit, MemoryStore } = require("express-rate-limit");
const fileUpload = require("express-fileupload");

const webRouter = require("@routes/web");
const apiRouter = require("@routes/api");

const { error404, errorHandler } = require("@middlewares/error");
const accessLogMiddleware = require("@middlewares/access");
const { errorResponse } = require("@helpers/response");

const PORT = process.env.PORT || 8888;

const app = express();

app.use(accessLogMiddleware);

const apiRateLimit = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: errorResponse(
    "Too many requests from this IP, please try again after 15 minutes"
  ),
  standardHeaders: true,
  legacyHeaders: true,
  store: new MemoryStore(),
});

app.use(apiRateLimit);

app.use(
  fileUpload({
    limits: {
      fileSize: 10 * 1024,
    },
    abortOnLimit: true,
  })
);

app.use(cors());
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(actuator());

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public")));

app.use(webRouter);
app.use("/api/v1", apiRouter);

app.use(error404);
app.use(errorHandler);
app.listen(PORT);

module.exports = app;
