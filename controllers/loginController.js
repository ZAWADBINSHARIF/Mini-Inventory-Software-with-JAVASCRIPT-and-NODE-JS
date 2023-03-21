function getLoginForm(req, res, next) {
    res.render('login-page.ejs');
}

module.exports = {getLoginForm}