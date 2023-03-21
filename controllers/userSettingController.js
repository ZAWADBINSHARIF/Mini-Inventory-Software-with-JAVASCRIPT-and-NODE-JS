function getUserSetting(req, res, next) {
    res.render('setting_pages/user-setting');
}

module.exports = { getUserSetting }