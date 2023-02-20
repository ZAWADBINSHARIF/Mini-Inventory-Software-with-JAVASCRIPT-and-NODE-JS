// external import
// const createHttpError = require("http-errors");

// internal import
const { logEvents } = require('./logEvent');

function notFoundHandler(req, res, next) {
    const title = '404 Page not found'
    res.render('404-page', {
        title
    });
}

function errorHandle(err, req, res, next) {
    logEvents(`${err.name}: ${err.message}`, 'errLog.txt');
    console.error(err.stack)
    res.status(500).send(err.message);
}

module.exports = {
    notFoundHandler,
    errorHandle
}