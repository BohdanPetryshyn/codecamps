const express = require('express');
const bootcamps = require('./routes/bootcamps');
const morgan = require('morgan');
const connectDB = require('./config/db');
const logError = require('./middleware/logError');
const handleApiError = require('./middleware/handleApiError');

require('dotenv').config({ path: './config/config.env' });

connectDB();

const app = express();

app.use(morgan('dev'));
app.use(express.json());

app.use('/api/v1/bootcamps', bootcamps);

app.use(logError);
app.use(handleApiError);

const server = app.listen(process.env.PORT, () =>
  console.log('The server has started.')
);

process.on('unhandledRejection', err => {
  console.log(`Error: ${err.message}`);
  server.close(() => process.exit(1));
});
