export const sendSuccess = (res, data, meta = undefined, status = 200) => {
  res.status(status).json({ success: true, data, meta });
};
