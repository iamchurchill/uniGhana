module.exports.successResponse = (
  message,
  data = null,
  access_token = null,
  refresh_token = null
) => {
  let response = {
    status: true,
    message: message,
  };
  if (data) {
    response.data = data;
  }

  if (access_token) {
    response.access_token = access_token;
  }

  if (refresh_token) {
    response.refresh_token = refresh_token;
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
