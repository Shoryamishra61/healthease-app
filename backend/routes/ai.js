const express = require('express');
const router = express.Router();
const { GoogleGenerativeAI } = require('@google/generative-ai');

// Initialize the Gemini model
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

router.post('/analyze-symptoms', async (req, res) => {
    const { symptoms } = req.body;

    if (!symptoms) {
        return res.status(400).json({ error: "Symptoms are required." });
    }

    // This is the detailed prompt we send to the AI
    const prompt = `
        You are "HealthEase AI", a helpful and reassuring medical information assistant.
        A user has reported the following symptoms: "${symptoms}".

        Your task is to respond in a friendly, conversational manner.
        1.  Acknowledge and summarize the user's symptoms.
        2.  Provide a brief, general analysis of possible causes (e.g., "This could be related to stress, dehydration, or a common virus.").
        3.  IMPORTANT: You must include the disclaimer: "I am an AI assistant and not a medical professional. This is not a diagnosis. Please consult a doctor for medical advice."
        4.  Suggest 1-2 simple, safe at-home care steps (e.g., "getting some rest," "staying hydrated").
        5.  Recommend when it might be appropriate to see a doctor (e.g., "if symptoms persist for more than a few days or worsen").

        Keep the entire response concise, easy to understand, and under 100 words.
    `;

    try {
        const result = await model.generateContent(prompt);
        const response = await result.response;
        const text = response.text();
        res.json({ analysis: text });
    } catch (error) {
        console.error("AI analysis error:", error);
        res.status(500).json({ error: "Failed to get AI analysis." });
    }
});

module.exports = router;