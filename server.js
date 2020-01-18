require('dotenv').config({ path: './config/config.env' });
require('colors');

const express = require('express');
const bootcamps = require('./routes/bootcamps');
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

app.use(logError);
app.use(handleApiError);
app.use(handleError);

const server = app.listen(process.env.PORT, () =>
  console.log('The server has started.'.green)
);

process.on('unhandledRejection', err => {
  console.log(`Error: ${err.message}`.red);
  server.close(() => process.exit(1));
});
