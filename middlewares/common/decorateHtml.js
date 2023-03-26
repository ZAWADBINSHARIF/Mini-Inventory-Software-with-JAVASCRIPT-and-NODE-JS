function decorateHtml(title_name = '') {
    return (req, res, next) => {
        res.locals.title = `${title_name} - Mini Inventory Web Software`;
        res.locals.errors = {};
        res.locals.data = {}
        next();
    }
}

module.exports = decorateHtml;