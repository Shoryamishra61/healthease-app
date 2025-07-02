import React, { useState } from 'react';
import axios from 'axios';
import { Button, TextField, Box, Typography, Paper, CircularProgress, Modal, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

// Style for the modal window
const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: { xs: '90%', sm: 500 }, // Responsive width
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
  borderRadius: 2,
};

function SymptomAnalyzer(props) {
    const [symptoms, setSymptoms] = useState('');
    const [analysis, setAnalysis] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false); // State to control the modal

    const handleOpenModal = () => setIsModalOpen(true);
    const handleCloseModal = () => setIsModalOpen(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setAnalysis('');
        try {
            const response = await axios.post('http://localhost:5000/api/ai/analyze-symptoms', { symptoms });
            setAnalysis(response.data.analysis);
            handleOpenModal(); // Open the modal with the new analysis
        } catch (error) {
            console.error("Failed to get analysis:", error);
            setAnalysis("Sorry, I couldn't perform the analysis right now. Please try again later.");
            handleOpenModal(); // Open the modal even if there's an error
        }
        setIsLoading(false);
    };

    return (
        <Paper sx={{ p: 3, height: '100%', display: 'flex', flexDirection: 'column' }}>
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

            {/* The Modal for displaying the AI response */}
            <Modal
                open={isModalOpen}
                onClose={handleCloseModal}
                aria-labelledby="ai-analysis-modal-title"
                aria-describedby="ai-analysis-modal-description"
            >
                <Box sx={style}>
                    <IconButton
                        aria-label="close"
                        onClick={handleCloseModal}
                        sx={{
                            position: 'absolute',
                            right: 8,
                            top: 8,
                            color: (theme) => theme.palette.grey[500],
                        }}
                    >
                        <CloseIcon />
                    </IconButton>
                    <Typography id="ai-analysis-modal-title" variant="h6" component="h2" sx={{ fontWeight: 'bold' }}>
                        HealthEase AI Analysis
                    </Typography>
                    <Typography id="ai-analysis-modal-description" sx={{ mt: 2, whiteSpace: 'pre-wrap' }}>
                        {analysis}
                    </Typography>
                </Box>
            </Modal>
        </Paper>
    );
}

export default SymptomAnalyzer;
