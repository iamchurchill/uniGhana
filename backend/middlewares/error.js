const createError = require("http-errors");
const { systemLogger } = require("@helpers/logger");
const { errorResponse } = require("@helpers/response");

module.exports.error404 = (request, response, next) => {
  return next(new createError.NotFound());
};

module.exports.errorHandler = (error, request, response, next) => {
  systemLogger.error(error.message);
  response.locals.message = error.message;
  response.locals.error = request.app.get("env") === "development" ? error : {};
  if (request.accepts("html")) {
    return response.status(error.status || 500).render("errors/error", {
      error: error,
    });
  }
  if (request.accepts("json")) {
    return response
      .status(error.status || 500)
      .json(errorResponse(error.message));
  }
  return response
    .status(error.status || 500)
    .type("txt")
    .send(error.message);
};
