// external import
const jwt = require('jsonwebtoken');

function checkLogin(req, res, next) {
    const cookies = Object.keys(req.signedCookies).length > 0 ? req.signedCookies : null;
    if (cookies) {
        try {
            const token = cookies[process.env.COOKIE_NAME];
            const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
            req.user = decoded;
            res.locals.loggedInUser = decoded;
            next();
        } catch (error) {
            res.redirect('/login');
        }
    } else {
        res.redirect('/login')
    }
}

function redirectLoggedIn (req, res, next) {
    const cookies = Object.keys(req.signedCookies).length > 0 ? req.signedCookies : null;
    if (cookies) {
        res.redirect('/')
    } else {
        next();
    }
}

module.exports = {
    checkLogin,
    redirectLoggedIn
}