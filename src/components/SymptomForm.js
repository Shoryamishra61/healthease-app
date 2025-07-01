import React, { useState } from 'react';
import axios from 'axios';
import { Button, TextField, Box, Typography, Paper, CircularProgress } from '@mui/material';

function SymptomAnalyzer(props) {
    const [symptoms, setSymptoms] = useState('');
    const [analysis, setAnalysis] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setAnalysis('');
        try {
            const response = await axios.post('http://localhost:5000/api/ai/analyze-symptoms', { symptoms });
            setAnalysis(response.data.analysis);
        } catch (error) {
            console.error("Failed to get analysis:", error);
            setAnalysis("Sorry, I couldn't perform the analysis right now. Please try again later.");
        }
        setIsLoading(false);
    };

    return (
        <Paper sx={{ p: 3, height: '100%', display: 'flex', flexDirection: 'column', ...props.style }}>
            <Typography variant="h6" gutterBottom>
                AI Symptom Analyzer
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                Describe your symptoms in plain language for an AI-powered analysis.
            </Typography>
            <Box component="form" onSubmit={handleSubmit} sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
                <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="symptoms"
                    label="e.g., 'I have a headache and a slight fever...'"
                    name="symptoms"
                    autoFocus
                    multiline
                    rows={4}
                    value={symptoms}
                    onChange={(e) => setSymptoms(e.target.value)}
                    sx={{ flexGrow: 1 }}
                />
                <Button type="submit" fullWidth variant="contained" sx={{ mt: 2 }} disabled={isLoading}>
                    {isLoading ? <CircularProgress size={24} color="inherit" /> : 'Get AI Analysis'}
                </Button>
            </Box>

            {analysis && (
                <Paper elevation={0} sx={{ p: 2, mt: 2, background: (theme) => theme.palette.mode === 'dark' ? 'rgba(0,0,0,0.2)' : '#f0f0f0', whiteSpace: 'pre-wrap', borderRadius: 2 }}>
                    <Typography variant="subtitle1" gutterBottom sx={{ fontWeight: 'bold' }}>HealthEase AI:</Typography>
                    <Typography variant="body2" component="p">{analysis}</Typography>
                </Paper>
            )}
        </Paper>
    );
}

export default SymptomAnalyzer;