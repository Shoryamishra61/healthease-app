const jwt = require('jsonwebtoken');
const JWT_SECRET = 'HealthEaseIsAGoodApp'; // Make sure this matches the secret in auth.js

const fetchuser = (req, res, next) => {
    // Get the token from the 'auth-token' header
    const token = req.header('auth-token');
    if (!token) {
        return res.status(401).send({ error: "Please authenticate using a valid token" });
    }
    try {
        // Verify the token and extract the user's ID
        const data = jwt.verify(token, JWT_SECRET);
        req.user = data.user;
        next(); // If the token is valid, proceed to the next function (the route handler)
    } catch (error) {
        res.status(401).send({ error: "Please authenticate using a valid token" });
    }
};

module.exports = fetchuser;