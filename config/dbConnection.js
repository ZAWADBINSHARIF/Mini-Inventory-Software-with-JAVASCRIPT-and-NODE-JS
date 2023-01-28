// external import
const mongoose = require('mongoose');

const dbConnection = async () => {
    try {
        await mongoose.connect(process.env.DATABASE_URI,
            {
                useNewUrlParser: true,
                useUnifiedTopology: true
            });
    } catch (error) {
        console.log(error);
    }
}

module.exports = dbConnection;