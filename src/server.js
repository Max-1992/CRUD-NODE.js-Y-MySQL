// Require Modules
const express = require('express');
const logger = require('morgan');
const helmet = require('helmet');
const cors = require('cors');
const colors = require('colors');

// Initialize the application
const app = express();

// Set Config Cors
const corsOptions = {
    exposedHeaders: [ 'Authorization' ]
};
app.use(cors(corsOptions));

// middlewares
app.use(logger('dev'));
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));


// Initializations Router
const router = require('./router');
router(app);


// Export app
module.exports = app;