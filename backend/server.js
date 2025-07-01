require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectToMongo = require('./db');

// 1. Connect to the database first
connectToMongo();

// 2. Create the Express app
const app = express();
const PORT = 5000;

// 3. Set up Middleware
// This middleware is essential for your API to read JSON data from requests
app.use(cors());
app.use(express.json());

// 4. Define API Routes
// This part must come AFTER `const app = express()` and the middleware setup
app.use('/api/auth', require('./routes/auth'));
// Add this line
app.use('/api/records', require('./routes/records'));
// This makes the 'uploads' folder public so files can be accessed
app.use('/uploads', express.static('uploads'));
// 5. Start the server
// Add this line with your other routes
app.use('/api/ai', require('./routes/ai'));

app.listen(PORT, () => {
    console.log(`HealthEase backend listening on http://localhost:${PORT}`);
});