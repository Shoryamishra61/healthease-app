// db.js
// Handles our database connection. 
const mongoose = require('mongoose');

// This is a placeholder connection string.
// For a real database, you would get this from a service like MongoDB Atlas.
const mongoURI = "mongodb+srv://<username>:<password>@<cluster-url>/healthease?retryWrites=true&w=majority";

const connectToMongo = async () => {
    try {
        // Mongoose will give a warning if you don't set this
        mongoose.set('strictQuery', false);
        await mongoose.connect(mongoURI);
        console.log("Attempting to connect to MongoDB..."); // We won't see a success message yet
    } catch (error) {
        // This error is expected for now because the mongoURI is just a placeholder
        console.error("MongoDB connection error (this is expected for now):", error.message);
    }
};

module.exports = connectToMongo;