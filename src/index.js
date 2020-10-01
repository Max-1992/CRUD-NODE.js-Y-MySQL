// Initialization of environments
const dotenv = require('dotenv');
dotenv.config({
    path: `${process.env.NODE_ENV}.env`
});

// Require application
const app = require('./server');

// Require Modules
// const slack = require('./services/services/slack');
// const sentry = require('./services/services/sentry');

// Error Handlers
process.on('unhandledRejection', (err) => {
    console.log('unhandledRejection: ', err);
    // slack.errorNotification(slack.channels.errors, err);
    // sentry.captureException(err);
});

process.on('uncaughtException', (err, res, req) => {
    console.log('uncaughtException: ', err);
    // slack.errorNotification(slack.channels.errors, err);
    // descomentar con el pase a produccion.
    // sentry.captureException(err);
    
});

// Start the server application
app.listen( process.env.PORT, (err) => {
    if(err) console.log(`Failed to start server on port ${process.env.PORT}`, `[ERROR]: ${err}`.red);

    const message = `Server is running in PORT ${process.env.PORT}`;
    // slack.notification(slack.channels.errors, message);
    console.log(`Server is running in`,`PORT ${process.env.PORT}`.blue);
});

