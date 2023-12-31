const { NODE_ENV, JWT_SECRET } = process.env;

const jwt = require('jsonwebtoken');

const NotAuthError = require('../errors/NotAuthError');

// eslint-disable-next-line consistent-return
module.exports = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    return next(new NotAuthError('Необходима авторизация'));
  }

  const token = authorization.replace('Bearer ', '');

  let payload;

  try {
    payload = jwt.verify(
      token,
      NODE_ENV === 'production' ? JWT_SECRET : 'jwt-secret',
    );
  } catch (err) {
    return next(new NotAuthError('Необходима авторизация2'));
  }

  req.user = payload;

  next();
};
