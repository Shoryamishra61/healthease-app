import React, { useState } from 'react';
import { useNavigate, Link as RouterLink } from 'react-router-dom';
import { Button, TextField, Container, Typography, Box, Link } from '@mui/material';
import axios from 'axios';

function Signup() {
    const [credentials, setCredentials] = useState({ name: "", email: "", password: "" });
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:5000/api/auth/createuser', {
                name: credentials.name,
                email: credentials.email,
                password: credentials.password,
            });

            if (response.data.success) {
                alert("Signup successful! Please log in.");
                navigate('/');
            }
        } catch (error) {
            // This is the updated, safer error handling
            if (error.response) {
                // The request was made and the server responded with a status code
                // that falls out of the range of 2xx
                console.error("Signup Error Response:", error.response.data);
                alert("Signup failed. The email may already be in use.");
            } else if (error.request) {
                // The request was made but no response was received
                console.error("Signup No Response:", error.request);
                alert("Could not connect to the server. Please make sure it's running.");
            } else {
                // Something happened in setting up the request that triggered an Error
                console.error('Signup Generic Error:', error.message);
            }
        }
    };

    const onChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value });
    };

    return (
        <Container component="main" maxWidth="xs">
            <Box
                sx={{
                    marginTop: 8,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
            >
                <Typography component="h1" variant="h5">
                    Create HealthEase Account
                </Typography>
                <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                    <TextField onChange={onChange} margin="normal" required fullWidth id="name" label="Full Name" name="name" autoFocus />
                    <TextField onChange={onChange} margin="normal" required fullWidth id="email" label="Email Address" name="email" />
                    <TextField onChange={onChange} margin="normal" required fullWidth name="password" label="Password" type="password" id="password" />
                    <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
                        Sign Up
                    </Button>
                    <Box sx={{ textAlign: 'right', width: '100%' }}>
                        <Link component={RouterLink} to="/" variant="body2">
                            {"Already have an account? Sign In"}
                        </Link>
                    </Box>
                </Box>
            </Box>
        </Container>
    );
}

export default Signup;