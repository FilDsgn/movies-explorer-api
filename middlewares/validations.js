const { celebrate, Joi } = require('celebrate');
const mongoose = require('mongoose');
const { isURL } = require('validator');

const BadRequestError = require('../errors/BadRequestError');

const validationUrl = (url) => {
  if (isURL(url)) {
    return url;
  }

  throw new BadRequestError('Передан некорректный URL');
};

const validationId = (id) => {
  if (mongoose.isValidObjectId(id)) {
    return id;
  }

  throw new BadRequestError('Передан некорректный ID');
};

const validationUpdateUser = celebrate({
  body: Joi.object()
    .keys({
      name: Joi.string().required(),
      email: Joi.string().email().required(),
    }),
});

const validationCreateMovie = celebrate({
  body: Joi.object()
    .keys({
      country: Joi.string().required(),
      director: Joi.string().required(),
      duration: Joi.number().required(),
      year: Joi.string().required(),
      description: Joi.string().required(),
      image: Joi.string().custom(validationUrl).required(),
      trailerLink: Joi.string().custom(validationUrl).required(),
      thumbnail: Joi.string().custom(validationUrl).required(),
      movieId: Joi.string().custom(validationId).required(),
      nameRU: Joi.string().required(),
      nameEN: Joi.string().required(),
    }),
});

const validationDeleteMovie = celebrate({
  body: Joi.object()
    .keys({
      movieId: Joi.string().custom(validationId).required(),
    }),
});

module.exports = {
  validationUpdateUser,
  validationCreateMovie,
  validationDeleteMovie,
};
