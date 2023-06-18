// require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
// const cors = require('cors');

const { PORT = 3000 } = process.env;
const { errors } = require('celebrate');
const router = require('./routes/router');

const auth = require('./middlewares/auth');
const handleError = require('./middlewares/handleError');

const { createUser, login } = require('./controllers/users');
const { validationCreateUser, validationLogin } = require('./middlewares/validations');

const { requestLogger, errorLogger } = require('./middlewares/logger');

const app = express();

// app.use(cors);
app.use(express.json());
app.use(requestLogger);

app.post('/signup', validationCreateUser, createUser);
app.post('/signin', validationLogin, login);

app.use(auth);
app.use('/', router);

app.use(errorLogger);

app.use(errors());
app.use(handleError);

mongoose.connect('mongodb://localhost:27017/bitfilmsdb');

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
