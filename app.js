require('dotenv').config();
// external import
const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const path = require('path');

// internal import
const dbConnect = require('./config/dbConnection.js');
const indexRoute = require('./routers/indexRoute');
const saleItemRoute = require('./routers/saleItemRoute');
const allProductRouter = require('./routers/allProductRoute');
const settingRouter = require('./routers/settingRoute');
const invoiceRouter = require('./routers/invoiceRoute.js');
const loginRoute = require('./routers/loginRoute.js');
const userSettingRouter = require('./routers/userSettingRouter')
const { notFoundHandler, errorHandle } = require('./middlewares/common/errorHandle.js');
const { checkLogin } = require('./middlewares/common/checkLogin.js');

const app = express();
const PORT = process.env.PORT || 4000;

// contect database
dbConnect();

// cookie-parser
app.use(cookieParser(process.env.COOKIE_SECRET_KEY));

// json parser
app.use(express.json());

// url encoded
app.use(express.urlencoded({ extended: true }));

// set view templete engine
app.set('view engine', 'ejs');

// set static files and folders
app.use(express.static(path.join(__dirname, 'public')));

// Router setup
app.use('/login', loginRoute);
app.use(checkLogin)
app.use('/', indexRoute);
app.use('/all-product', allProductRouter);
app.use('/saleItem', saleItemRoute);
app.use('/invoice', invoiceRouter);
app.use('/setting', settingRouter);
app.use('/user-setting', userSettingRouter);

// 404 page not found handler
app.all('*', notFoundHandler);

// express Error Handler
app.use(errorHandle);

mongoose.connection.once('open', () => {
    app.listen(PORT, () => {
        console.log(`Application listening on PORT : http://localhost:${PORT}`);
    })
    console.log(`database connected successfully`);
});