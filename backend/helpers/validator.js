const { validationResult } = require("express-validator");
const { errorResponse } = require("@helpers/response");

module.exports.parallelValidator = (validations) => {
  return async (request, response, next) => {
    await Promise.all(validations.map((validation) => validation.run(request)));
    const errors = validationResult(request);
    if (errors.isEmpty()) {
      return next();
    }
    response
      .status(422)
      .json(
        errorResponse(
          "Please check and make sure you providing all require data",
          errors.array()
        )
      );
  };
};

module.exports.sequentialValidator = (validations) => {
  return async (request, response, next) => {
    for (let validation of validations) {
      const result = await validation.run(request);
      if (result.errors.length) break;
    }
    const errors = validationResult(request);
    if (errors.isEmpty()) {
      return next();
    }
    response
      .status(422)
      .json(
        errorResponse(
          "Please check and make sure you providing all require data",
          errors.array()
        )
      );
  };
};
