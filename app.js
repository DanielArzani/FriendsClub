const express = require('express');
const morgan = require('morgan');

const { userRoutes } = require('./Routes/api/');

const app = express();

console.log(process.env.NODE_ENV);
// Only use morgan in development environment
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

/**-------------------------
 *    GLOBAL MIDDLEWARE
 *------------------------**/
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/**-------------------------
 *          ROUTES
 *------------------------**/
app.use('/api/users', userRoutes);

// Will catch any requests (Get, Post, etc...) to non-specified routes
app.all('*', (req, res, next) => {
  res.status(404).send(`Can't find ${req.originalUrl} on this server`);
});

module.exports = app;
