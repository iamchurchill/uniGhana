const { successResponse } = require("@helpers/response");

module.exports.index = (request, response, next) => {
  return response.status(200).json(successResponse("The UniGhana project"));
};
