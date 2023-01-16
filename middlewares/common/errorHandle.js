// external import
// const createHttpError = require("http-errors");

function notFoundHandler(req, res, next) {
    res.send('<h1>Page Not Found 🥱. Go back to <a href="/">Home Page</a> 😴.</h1>');
}
module.exports = {
    notFoundHandler
}