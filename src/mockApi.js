// src/mockApi.js

// This function simulates a network delay, so our app feels real.
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

// --- FUNCTION 1 ---
export const loginUser = async (email, password) => {
    await delay(500);
    console.log("Logging in user:", email);
    return { success: true, user: { name: 'Test Patient' } };
};

// --- FUNCTION 2 (NEW) ---
export const submitSymptoms = async (symptoms) => {
    await delay(800);
    console.log("Submitting symptoms:", symptoms);
    return {
        success: true,
        recommendation: 'Based on your symptoms, we recommend consulting a doctor. We can book an appointment now.'
    };
};

// --- FUNCTION 3 (NEW) ---
export const bookAppointment = async () => {
    await delay(1000);
    console.log("Booking appointment...");
    return {
        success: true,
        queueStatus: { position: 4, estimatedTime: '15 minutes' }
    };
};