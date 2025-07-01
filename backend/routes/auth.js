const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const fetchuser = require('../middleware/fetchuser'); // Import the new middleware

const JWT_SECRET = 'HealthEaseIsAGoodApp';

/// ROUTE 1: Create a User using: POST "/api/auth/createuser". (DEMO VERSION)
router.post('/createuser', [
    // Validation rules are still good
    body('name', 'Enter a valid name').isLength({ min: 3 }),
    body('email', 'Enter a valid email').isEmail(),
    body('password', 'Password must be at least 5 characters').isLength({ min: 5 }),
], async (req, res) => {
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    
    console.log(`Signup attempt for ${req.body.email}. Bypassing database for demo.`);

    /*
    // --- WE ARE TEMPORARILY COMMENTING OUT THE REAL DATABASE LOGIC ---
    try {
        // Check if a user with this email already exists
        let user = await User.findOne({ email: req.body.email });
        if (user) {
            return res.status(400).json({ error: "Sorry, a user with this email already exists" });
        }

        // Encrypt the password
        const salt = await bcrypt.genSalt(10);
        const securedPassword = await bcrypt.hash(req.body.password, salt);

        // Create and save the new user to the database
        user = await User.create({
            name: req.body.name,
            email: req.body.email,
            password: securedPassword,
            role: req.body.role || 'customer',
        });
        
        // Create a token for the new user
        const data = { user: { id: user.id } };
        const authtoken = jwt.sign(data, JWT_SECRET);
        res.json({ success: true, authtoken });

    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
    */

    // --- NEW DEMO LOGIC ---
    // Instantly send back a success message.
    res.json({ success: true });
});

// ROUTE 2: Authenticate a User (POST "/api/auth/login") - No changes here
// ROUTE 2: Authenticate a User using: POST "/api/auth/login". (DEMO VERSION)
router.post('/login', [
    // Validation rules are still good to keep
    body('email', 'Enter a valid email').isEmail(),
    body('password', 'Password cannot be blank').exists(),
], async (req, res) => {
    // Check for validation errors first
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    console.log(`Login attempt for ${req.body.email}. Bypassing database for demo.`);

    /*
    // --- WE ARE TEMPORARILY COMMENTING OUT THE REAL DATABASE LOGIC ---
    try {
        // Check if user with this email exists
        let user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ error: "Please try to login with correct credentials" });
        }

        // Compare the submitted password with the hashed password in the database
        const passwordCompare = await bcrypt.compare(password, user.password);
        if (!passwordCompare) {
            return res.status(400).json({ success: false, error: "Please try to login with correct credentials" });
        }
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
    */

    // --- NEW DEMO LOGIC ---
    // Instantly create a fake token and send it back.
    const data = {
        user: {
            id: 'fakeUserId123' // Use a fake ID for the demo
        }
    };
    const authtoken = jwt.sign(data, JWT_SECRET);

    // Send a success response immediately
    res.json({ success: true, authtoken });

});

// --- NEW CODE STARTS HERE ---

// ROUTE 3: Get logged-in User Details using: POST "/api/auth/getuser". Login required.
router.post('/getuser', fetchuser, async (req, res) => {
    try {
        const userId = req.user.id;
        const user = await User.findById(userId).select("-password"); // Find user by ID and exclude the password
        res.send(user);
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
});

// ROUTE 4: Authenticate a HOSPITAL User using: POST "/api/auth/hospitallogin".
router.post('/hospitallogin', [
    body('email', 'Enter a valid email').isEmail(),
    body('password', 'Password cannot be blank').exists(),
], async (req, res) => {
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    // --- DEMO LOGIC FOR HOSPITAL LOGIN ---
    // For the hackathon, we will bypass the database check
    // and instantly log in any valid email format.
    console.log(`Hospital login attempt for ${req.body.email}. Bypassing database.`);
    
    // Instantly create a fake token for the hospital user
    const data = {
        user: {
            id: 'fakeHospitalId456',
            role: 'hospital' // Specify the role in the token
        }
    };
    const authtoken = jwt.sign(data, JWT_SECRET);

    // Send a success response immediately
    res.json({ success: true, authtoken });
});

module.exports = router;