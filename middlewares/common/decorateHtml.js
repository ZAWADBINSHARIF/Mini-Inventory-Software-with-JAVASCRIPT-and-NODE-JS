function decorateHtml(title_name = '') {
    return (req, res, next) => {
        res.locals.title = `${title_name} - Mini Inventory Web Software`;
        next();
    }
}

module.exports = decorateHtml;