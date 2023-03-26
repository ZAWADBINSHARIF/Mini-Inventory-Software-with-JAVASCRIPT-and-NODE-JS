// external import
const bcrypt = require('bcrypt');

// internal import
const User = require('../models/user.js');

function getUserSetting(req, res, next) {
    res.render('setting_pages/user-setting');
}

async function addUser(req, res, next) {

    const hashPass = await bcrypt.hash(req.body.password, 10);

    try {
        const newUser = new User({
            ...req.body,
            password: hashPass
        });

        await newUser.save();
        return res.render('setting_pages/user-setting', {
            title: 'User is added',
            errors:{},
            data: {
                common: {
                    msg: `${req.body.name} is successfully added`
                }
            }
        })
    } catch (error) {

    }


}

module.exports = {
    getUserSetting,
    addUser
}