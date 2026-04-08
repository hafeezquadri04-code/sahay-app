export const errorHandler = (err, req, res, next) => {
  const status = err.status || 500;
  const payload = {
    message: err.message || 'Internal Server Error',
  };
  // include validation errors or extra info if present
  if (err.errors) payload.errors = err.errors;
  return res.status(status).json(payload);
};

export default errorHandler;