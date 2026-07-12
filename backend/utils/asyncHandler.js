// Wraps async route handlers so thrown errors reach errorMiddleware
// instead of crashing the server or hanging the request.
function asyncHandler(fn) {
  return (req, res, next) => Promise.resolve(fn(req, res, next)).catch(next);
}

module.exports = asyncHandler;
