import React, { useState, useEffect, useMemo } from 'react';
import axios from 'axios';
import { Container, Typography, Box, Button, TextField, Paper, List, ListItem, ListItemText, IconButton, Link, CircularProgress } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import FileOpenIcon from '@mui/icons-material/FileOpen';

function HealthRecord() {
    const [records, setRecords] = useState([]);
    const [form, setForm] = useState({ title: '', description: '', recordType: 'General Note' });
    const [selectedFile, setSelectedFile] = useState(null);
    const [isLoading, setIsLoading] = useState(true); // State to track loading

    const api = useMemo(() => {
        return axios.create({
            baseURL: 'http://localhost:5000/api/records',
            headers: { 'auth-token': localStorage.getItem('token') }
        });
    }, []);

    useEffect(() => {
        const fetchRecords = async () => {
            setIsLoading(true); // Start loading
            try {
                const response = await api.get('/fetchallrecords');
                setRecords(response.data);
            } catch (error) {
                console.error("Failed to fetch records:", error);
                alert("Could not fetch records. Please ensure the backend server is running.");
            }
            setIsLoading(false); // End loading
        };
        fetchRecords();
    }, [api]);

    const handleFormChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };
    
    const handleFileChange = (e) => {
        setSelectedFile(e.target.files[0]);
    };

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('title', form.title);
        formData.append('description', form.description);
        formData.append('recordType', form.recordType);
        if (selectedFile) {
            formData.append('recordFile', selectedFile);
        }

        try {
            const response = await api.post('/addrecord', formData, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });
            setRecords([...records, response.data]);
            setForm({ title: '', description: '', recordType: 'General Note' });
            setSelectedFile(null);
            if (document.getElementById('fileInput')) {
                document.getElementById('fileInput').value = "";
            }
        } catch (error) {
            console.error("Failed to add record:", error);
            alert("Failed to save record. Please ensure all fields are filled correctly.");
        }
    };

    const handleDelete = async (id) => {
        try {
            await api.delete(`/deleterecord/${id}`);
            setRecords(records.filter(record => record._id !== id));
        } catch (error) {
            console.error("Failed to delete record:", error);
            alert("Failed to delete record.");
        }
    };

    return (
        <Container maxWidth="md" sx={{ mt: 4, mb: 4 }}>
            <Typography variant="h4" gutterBottom>My Health Records</Typography>
            
            <Paper component="form" onSubmit={handleFormSubmit} sx={{ p: 3, mb: 4 }}>
                <Typography variant="h6" gutterBottom>Add New Record</Typography>
                <TextField name="title" label="Record Title" value={form.title} onChange={handleFormChange} fullWidth required margin="normal" />
                <TextField name="recordType" label="Record Type (e.g., Lab Report)" value={form.recordType} onChange={handleFormChange} fullWidth margin="normal" />
                <TextField name="description" label="Description / Notes" value={form.description} onChange={handleFormChange} fullWidth required multiline rows={3} margin="normal" />
                
                <Button variant="outlined" component="label" sx={{ mt: 2 }}>
                    Upload File (PDF, JPG, PNG)
                    <input id="fileInput" type="file" hidden onChange={handleFileChange} />
                </Button>
                {selectedFile && <Typography variant="body2" sx={{ml:1, display:'inline'}}>{selectedFile.name}</Typography>}
                
                <Button type="submit" variant="contained" sx={{ mt: 2, display: 'block' }}>Save Record</Button>
            </Paper>

            <Typography variant="h5" gutterBottom>Your Saved Records</Typography>
            
            {/* Conditional Rendering for Loading and Empty State */}
            {isLoading ? (
                <Box sx={{ display: 'flex', justifyContent: 'center', my: 5 }}>
                    <CircularProgress />
                </Box>
            ) : (
                <List>
                    {records.length > 0 ? records.map(record => (
                        <Paper key={record._id} sx={{ mb: 2 }}>
                            <ListItem
                                secondaryAction={
                                    <Box>
                                        {record.filePath && (
                                            <IconButton edge="end" component={Link} href={`http://localhost:5000/${record.filePath.replace(/\\/g, '/')}`} target="_blank" rel="noopener noreferrer">
                                                <FileOpenIcon />
                                            </IconButton>
                                        )}
                                        <IconButton edge="end" aria-label="delete" onClick={() => handleDelete(record._id)}>
                                            <DeleteIcon />
                                        </IconButton>
                                    </Box>
                                }
                            >
                                <ListItemText
                                    primary={record.title}
                                    secondary={`${record.recordType} - ${new Date(record.date).toLocaleDateString()}`}
                                />
                            </ListItem>
                        </Paper>
                    )) : (
                        <Paper sx={{ p: 3, textAlign: 'center' }}>
                            <Typography>You have no saved records. Add one using the form above!</Typography>
                        </Paper>
                    )}
                </List>
            )}
        </Container>
    );
}

export default HealthRecord;