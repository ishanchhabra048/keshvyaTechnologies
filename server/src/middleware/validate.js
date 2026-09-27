import { asyncHandler } from '../utils/asyncHandler.js';
export const validate = (schema) => asyncHandler(async (req, res, next) => {
  req.body = await schema.parseAsync(req.body);
  next();
});
