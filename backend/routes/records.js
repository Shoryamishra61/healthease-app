const express = require('express');
const router = express.Router();
const fetchuser = require('../middleware/fetchuser');
const { body, validationResult } = require('express-validator');

// This temporary array acts as our in-memory demo database.
let demoRecords = [];
let recordIdCounter = 0;

// ROUTE 1: Get all Health Records for a user.
// Uses GET "/api/records/fetchallrecords". Login required.
router.get('/fetchallrecords', fetchuser, async (req, res) => {
    try {
        const userRecords = demoRecords.filter(record => record.user === req.user.id);
        res.json(userRecords);
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
});

// ROUTE 2: Add a new Health Record using: POST "/api/records/addrecord". Login required. (Simplified)
router.post('/addrecord', fetchuser, [
    body('title', 'Enter a valid title').isLength({ min: 3 }),
    body('description', 'Description must be at least 5 characters').isLength({ min: 5 }),
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const { title, description, recordType } = req.body;
        const newRecord = {
            _id: `record_${recordIdCounter++}`,
            user: req.user.id,
            title,
            description,
            recordType,
            filePath: null, // No file path for now
            date: new Date()
        };
        demoRecords.push(newRecord);
        res.json(newRecord);
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
});

// ROUTE 3: Delete an existing Health Record.
// Uses DELETE "/api/records/deleterecord/:id". Login required.
router.delete('/deleterecord/:id', fetchuser, async (req, res) => {
    try {
        const recordId = req.params.id;
        const initialLength = demoRecords.length;

        // Filter out the record to be deleted
        demoRecords = demoRecords.filter(record => {
            return !(record._id === recordId && record.user === req.user.id);
        });

        if (demoRecords.length === initialLength) {
            return res.status(404).send("Record not found or user not authorized.");
        }

        res.json({ "Success": "Record has been deleted" });
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
});

module.exports = router;