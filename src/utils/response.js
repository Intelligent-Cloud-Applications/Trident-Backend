/**
 * Standard HTTP API Response Builder
 */

const headers = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Credentials': true,
  'Content-Type': 'application/json',
};

function success(data, statusCode = 200) {
  return {
    statusCode,
    headers,
    body: JSON.stringify(data),
  };
}

function error(message, statusCode = 500, details = null) {
  const body = { message };
  if (details) body.details = details;
  return {
    statusCode,
    headers,
    body: JSON.stringify(body),
  };
}

module.exports = {
  headers,
  success,
  error,
};
