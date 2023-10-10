const express = require('express');
const path = require('path');
const AppError = require('./utils/appError.js');
const helmet = require('helmet');
const xss = require('xss-clean');
const blogsRouter = require('./routes/blogsRouter.js');

const app = express();


// GLOBAL MIDDLEWARES

// Set security HTTP headers
app.use(helmet());

// Body parser, reading data from body into req.body
app.use(express.json());

// Data Sanitaztion against XSS (cross site scripting)
app.use(xss());

// Serving static files
app.use(express.static(path.join(__dirname, 'public')));

// ROUTES
app.use('/api', blogsRouter);

app.all('*', (req, res, next)=>{
    next(new AppError(`cant find ${req.originalUrl} on this server!`), 404);
})

module.exports = app;

