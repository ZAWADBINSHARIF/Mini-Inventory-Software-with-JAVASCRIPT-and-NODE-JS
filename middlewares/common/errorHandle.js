// internal import
const createHttpError = require("http-errors");

function notFoundHandler(req, res, next) {
    res.send('<h1>Page Not Found</h1>')
    next(createHttpError(404, 'Page Not Found'))
}

module.exports = {
    notFoundHandler
}