const movieRoutes = require('express').Router();

const { getMovies, createMovie, deleteMovie } = require('../controllers/movies');
const { validationCreateMovie, validationDeleteMovie } = require('../middlewares/validations');

movieRoutes.get('/', getMovies);
movieRoutes.post('/', validationCreateMovie, createMovie);
movieRoutes.delete('/:movieId', validationDeleteMovie, deleteMovie);

module.exports = movieRoutes;
