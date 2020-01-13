const express = require('express');
const bootcamps = require('./routes/bootcamps');
const morgan = require('morgan');
const connectDB = require('./config/db');

require('dotenv').config({ path: './config/config.env' });

connectDB();

const app = express();

// Setup middleware
app.use(morgan('dev'));

app.use('/api/v1/bootcamps', bootcamps);

const server = app.listen(process.env.PORT, () =>
  console.log('The server has started.')
);

process.on('unhandledRejection', err => {
  console.log(`Error: ${err.message}`);
  server.close(() => process.exit(1));
});
