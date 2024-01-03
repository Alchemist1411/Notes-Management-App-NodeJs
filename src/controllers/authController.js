const User = require('../models/User');
const jwt = require('jsonwebtoken');
const JWT_SECRET_KEY = "123123";
const z = require('zod');

// Using Zod for Input Validation
const userSchemaValidator = z.object({
    username: z.string().email(), //Using email as the username
    password: z.string().min(6),  //Password with minimum 6 characters
});


//Signup function
async function signup(req, res) {
    try {
        const response = userSchemaValidator.safeParse(req.body);
        const username = response.data.username;
        const password = response.data.password;

        //Check if existing user
        const existingUser = await User.findOne({ username: username });
        if (existingUser) {
            return res.status(400).json({ message: 'User already registered, please login' });
        }

        // Create a new user
        await User.create({
            username: username,
            password: password,
        });

        res.status(201).json({ message: 'User registered successfully' });
    }
    catch (error) {
        res.status(400).json({ error: error.errors });
    }
}


//Login Function
async function login(req, res) {
    try {
        const response = userSchemaValidator.safeParse(req.body);
        const username = response.data.username;
        const password = response.data.password;

        // Find the user by username
        const user = await User.findOne({ username: username, password: password });

        // Check if the user exists
        if (!user) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }

        // Check if both username and password are correct
        if (!user.password || !user.username || user.username !== username || user.password !== password) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }

        // Generate and send a JWT token
        const token = jwt.sign({ username: user.username }, JWT_SECRET_KEY);
        res.json({ token });
    }
    catch (error) {
        res.status(400).json({ error: error.message });
    }
}


module.exports = { signup, login };