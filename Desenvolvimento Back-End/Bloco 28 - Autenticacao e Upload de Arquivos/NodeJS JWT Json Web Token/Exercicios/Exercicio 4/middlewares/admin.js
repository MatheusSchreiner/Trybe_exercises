module.exports = (req, _res, next) => {
  const { user } = req;
  if (!user) {
    const err = new Error('This endpoint requires authentication');
    err.statusCode = 401;
    return next(err);
  }

  if (!user.admin) {
    const err = new Error('Restrited access');
    err.statusCode = 403;
    return next(err);
  }

  return next();
};
