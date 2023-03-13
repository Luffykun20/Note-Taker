const express = require('express');


const apiRouter = require('./apiRoutes');

const app = express();

//http://localhost:3001/api/notes
app.use('/notes', apiRouter);

module.exports = app;