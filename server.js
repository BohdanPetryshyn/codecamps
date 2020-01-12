const express = require('express');
const bootcamps = require('./routes/bootcamps');

const app = express();

app.use('/api/v1/bootcamps', bootcamps);

app.listen(8080, () => console.log('The server has started.'));