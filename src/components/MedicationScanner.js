import React, { useState } from 'react';
import Tesseract from 'tesseract.js';
import { Button, Box, Typography, Paper, CircularProgress } from '@mui/material';

function MedicationScanner(props) {
    const [image, setImage] = useState(null);
    const [text, setText] = useState('');
    const [isScanning, setIsScanning] = useState(false);

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImage(URL.createObjectURL(file));
            setText('');
            setIsScanning(false);
        }
    };

    const handleScan = () => {
        if (!image) return;
        setIsScanning(true);
        setText('Processing image...');
        Tesseract.recognize(image, 'eng')
        .catch(err => {
          console.error("OCR Error:", err);
          setText('Error: Could not scan the image.');
          setIsScanning(false);
        })
        .then(({ data: { text } }) => {
          setText(text);
          setIsScanning(false);
        });
    };

    return (
        <Paper sx={{ p: 3 , ...props.style}}>
            <Typography variant="h6" gutterBottom>AI Medication Scanner</Typography>
            <Button variant="contained" component="label" fullWidth sx={{mt: 1}}>
                Upload Medication Image
                <input type="file" hidden onChange={handleImageChange} accept="image/*" />
            </Button>

            {image && (
                <Box sx={{ mt: 2, textAlign: 'center' }}>
                    <img src={image} alt="Medication preview" style={{ maxWidth: '100%', maxHeight: '150px', borderRadius: '8px' }} />
                    <Button onClick={handleScan} variant="contained" color="secondary" fullWidth sx={{mt: 1}} disabled={isScanning}>
                        {isScanning ? <CircularProgress size={24} /> : 'Scan for Details'}
                    </Button>
                </Box>
            )}

            {(text) && (
                <Paper elevation={0} sx={{p: 2, mt: 2, whiteSpace: 'pre-wrap', background: '#f5f5f5', borderRadius: 2}}>
                    <Typography variant="subtitle1">Scan Result:</Typography>
                    <Typography variant="body2" component="pre">{text}</Typography>
                </Paper>
            )}
        </Paper>
    );
}

export default MedicationScanner;