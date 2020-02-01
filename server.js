require('dotenv').config({ path: './config/config.env' });
require('colors');

const express = require('express');
const bootcamps = require('./routes/bootcamps');
const courses = require('./routes/courses');
const auth = require('./routes/auth');
const morgan = require('morgan');
const connectDB = require('./config/db');
const logError = require('./middleware/logError');
const handleApiError = require('./middleware/handleApiError');
const handleError = require('./middleware/handleError');

connectDB();

const app = express();

app.use(morgan('dev'));
app.use(express.json());

app.use('/api/v1/bootcamps', bootcamps);
app.use('/api/v1/courses', courses);
app.use('/api/v1/auth', auth);

app.use(logError);
app.use(handleApiError);
app.use(handleError);

const server = app.listen(process.env.PORT, () =>
  console.log('The server has started.'.green)
);

process.on('unhandledRejection', err => {
  console.log(`Error: ${err.message}`.red);
});
