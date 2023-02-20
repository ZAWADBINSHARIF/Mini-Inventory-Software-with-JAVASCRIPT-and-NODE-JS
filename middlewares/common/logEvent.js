// external import
const { format } = require('date-fns');
const crypto = require('crypto');
const fs = require('fs');
const path = require('path');

const logEvents = async (message, logName) => {
    const errorNumber = crypto.randomBytes(24).toString('hex');
    const dateTime = format(new Date(), 'dd-MMM-yyyy\th:mm:ss aaa');
    const logMessage = `${dateTime}\t${errorNumber}\t${message}\n`

    try {
        if (!fs.existsSync(path(__dirname, '..', '..', 'logs'))) {
            await fs.promises.mkdir(path(__dirname, '..', '..', 'logs'))
        }
        await fs.promises.appendFile(path(__dirname, '..', '..', 'logs', logName), logMessage);
    } catch(err) {
        console.log(err)
    }
}

const logger = (req, res, next) => {
    logEvents(`${req.method}\t${req.headers.origin}\t${req.url}`, 'reqLog.txt');
    console.log(`${req.method} ${req.path}`);
    next();
}

module.exports = { logger, logEvents };