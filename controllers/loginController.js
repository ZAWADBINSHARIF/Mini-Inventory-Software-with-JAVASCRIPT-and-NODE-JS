// external import
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const createHttpError = require('http-errors');

// internal import
const User = require('../models/user');

function getLoginForm(req, res, next) {
    res.render('login-page.ejs');
}

async function login(req, res, next) {

    try {
        const foundUser = await User.findOne({ email: req.body.email });

        if (foundUser && foundUser._id) {
            const isValidPassword = await bcrypt.compare(
                req.body.password,
                foundUser.password
            )

            if (isValidPassword) {
                const userObject = {
                    username: foundUser.name,
                    email: foundUser.email,
                    role: foundUser.role
                }

                // generate jwr token
                const token = jwt.sign(userObject, process.env.JWT_SECRET_KEY, {
                    expiresIn: process.env.JWT_EXPIRY
                })

                // set cookie
                res.cookie(process.env.COOKIE_NAME, token, {
                    maxAge: process.env.JWT_EXPIRY,
                    httpOnly: true,
                    signed: true
                });
                res.locals.loggedInUser = userObject;
                res.redirect('/')
            } else {
                throw createHttpError('Password is worng!');
            }

        } else {
            throw createHttpError('Login failed! Please Try again.')
        }
    } catch (err) {
        res.render('login-page', {
            errors: {
                common: {
                    msg: err.message
                }
            },
            data: {
                email: req.body.email,
                password: req.body.password
            }
        });
    }
}

function logout(req, res, next) {
    res.clearCookie(process.env.COOKIE_NAME);
    res.send('logged Out');
}

module.exports = {
    getLoginForm,
    login,
    logout
}