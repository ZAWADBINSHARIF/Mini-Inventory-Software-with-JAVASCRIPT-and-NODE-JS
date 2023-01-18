// external import
// const createHttpError = require("http-errors");

function notFoundHandler(req, res, next) {
    res.render('404-page');
}
module.exports = {
    notFoundHandler
}