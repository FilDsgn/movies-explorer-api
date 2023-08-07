const userRoutes = require('express').Router();

const { getUsers, getUserInfo, updateUser } = require('../controllers/users');
const { validationUpdateUser } = require('../middlewares/validations');

userRoutes.get('/', getUsers);
userRoutes.get('/me', getUserInfo);
userRoutes.patch('/me', validationUpdateUser, updateUser);

module.exports = userRoutes;
