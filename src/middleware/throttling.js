// Request throttling
const throttling = require('express-rate-limit');

const throttle = throttling({
    windowMs: 60 * 1000, // 1 minute
    max: 100, // 100 requests per minute
    message: 'Too many requests from this IP, please try again after a minute.'
});


module.exports = throttle;