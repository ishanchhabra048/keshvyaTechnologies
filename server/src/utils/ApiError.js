export class ApiError extends Error {
  constructor(status, message, code = 'INTERNAL_ERROR', details = null) {
    super(message);
    this.status = status;
    this.code = code;
    this.details = details;
    Error.captureStackTrace(this, this.constructor);
  }
}
