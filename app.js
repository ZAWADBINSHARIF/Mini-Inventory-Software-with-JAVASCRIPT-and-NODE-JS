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
const { notFoundHandler } = require('./middlewares/common/errorHandle.js');

const app = express();
const PORT = process.env.PORT || 4000;

// contect database
dbConnect();

// cookie-parser
app.use(cookieParser());

// json parser
app.use(express.json());

// url encoded
app.use(express.urlencoded({ extended: true }));

// set view templete engine
app.set('view engine', 'ejs');

// set static files and folders
app.use(express.static(path.join(__dirname, 'public')));

// Router setup
app.use('/', indexRoute);
app.use('/all-product', allProductRouter);
app.use('/saleItem', saleItemRoute);
app.use('/setting', settingRouter);

// 404 page not found handler
app.use(notFoundHandler);

mongoose.connection.once('open', () => {
    app.listen(PORT, () => {
        console.log(`Application listening on PORT : http://localhost:${PORT}`);
    })
    console.log(`database connected successfully`);
});