require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const { PORT = 3000 } = process.env;
const { errors } = require('celebrate');
const router = require('./routes/router');

const auth = require('./middlewares/auth');
const handleError = require('./middlewares/handleError');

const app = express();

app.use(cors);
app.use(express.json());

mongoose.connect('mongodb://127.0.0.1:27017/bitfilmsdb');

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
