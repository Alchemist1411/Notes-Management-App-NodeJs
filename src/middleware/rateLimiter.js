//Rate limitter
const userRequestCounts = new Map();

setInterval(() => {
    // Clearing user request counts every one second
    userRequestCounts.clear();
}, 1000);

function rateLimiter(req, res, next) {
    const userId = req.user._id; // Assuming we have user information stored in req.user

    if (userRequestCounts.has(userId)) {
        const requestCount = userRequestCounts.get(userId);

        if (requestCount > 10) { //Taking 10 requests per second as base rate for testing purposes
            return res.status(429).json({ error: "Too many requests" });
        } else {
            userRequestCounts.set(userId, requestCount + 1);
            next();
        }
    } else {
        userRequestCounts.set(userId, 1); // Initialize the request count for the user
        next();
    }
}


module.exports = rateLimiter;