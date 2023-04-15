// external import
const bcrypt = require('bcrypt');

// internal import
const User = require('../models/user.js');

async function getUserSetting(req, res, next) {
    try {
        const allUsers = await User.find();
        res.render('setting_pages/user-setting', {
            allUsers
        });
    } catch (error) {
        next(error);
    }

}

async function addUser(req, res, next) {

    const hashPass = await bcrypt.hash(req.body.password, 10);

    try {
        const newUser = new User({
            ...req.body,
            password: hashPass
        });

        const allUsers = await User.find();

        await newUser.save();
        return res.render('setting_pages/user-setting', {
            title: 'User is added',
            allUsers,
            errors: {},
            data: {
                common: {
                    msg: `${req.body.name} is successfully added`
                }
            }
        })
    } catch (error) {
        res.status(500).json({
            errors: {
                common: "Unknown error occured!"
            }
        })
    }


}

module.exports = {
    getUserSetting,
    addUser
}