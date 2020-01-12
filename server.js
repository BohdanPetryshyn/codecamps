const express = require('express');
const bootcamps = require('./routes/bootcamps');
const requestMiddleware = require('./middleware/requestLogger');

require('dotenv').config({ path: './config/config.env' });

const app = express();

// Setup middleware
app.use(requestMiddleware);

app.use('/api/v1/bootcamps', bootcamps);

app.listen(process.env.PORT, () => console.log('The server has started.'));
