module.exports.successResponse = (message, data = null) => {
  let response = {
    status: true,
    message: message,
  };
  if (data) {
    response.data = data;
  }
  return response;
};

module.exports.errorResponse = (message, errors = null) => {
  let response = {
    status: false,
    message: message,
  };
  if (errors) {
    response.errors = errors;
  }
  return response;
};
