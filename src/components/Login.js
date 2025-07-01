import React, { useState } from 'react';
import { useNavigate, Link as RouterLink } from 'react-router-dom'; // <-- This was also missing here
import { Button, TextField, Container, Typography, Box, Link, ToggleButton, ToggleButtonGroup, Paper } from '@mui/material';
import axios from 'axios';

function Login() {
    const [loginType, setLoginType] = useState('customer');
    const [credentials, setCredentials] = useState({ email: "", password: "" });
    const navigate = useNavigate();

    const handleLoginTypeChange = (event, newLoginType) => {
        if (newLoginType !== null) {
            setLoginType(newLoginType);
        }
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        const endpoint = loginType === 'customer' 
            ? 'http://localhost:5000/api/auth/login'
            : 'http://localhost:5000/api/auth/hospitallogin';

        try {
            const response = await axios.post(endpoint, {
                email: credentials.email,
                password: credentials.password
            });
            
            if (response.data.success) {
                localStorage.setItem('token', response.data.authtoken);
                const redirectPath = loginType === 'customer' ? '/dashboard' : '/hospital/dashboard';
                navigate(redirectPath);
            }
        } catch (error) {
            alert("Login failed. Please check your credentials.");
        }
    };

    const onChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value });
    };

    return (
        <Container component="main" maxWidth="xs" sx={{ display: 'flex', alignItems: 'center', height: '90vh' }}>
            <Paper
                sx={{
                    padding: 4,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    width: '100%',
                    backgroundColor: (theme) => theme.palette.mode === 'light' ? 'rgba(255, 255, 255, 0.7)' : 'rgba(30, 30, 30, 0.8)',
                    backdropFilter: 'blur(10px)',
                }}
            >
                <Typography component="h1" variant="h5">HealthEase</Typography>
                <Typography component="p" variant="body2" sx={{ mb: 3 }}>Sign in to continue</Typography>

                <ToggleButtonGroup color="primary" value={loginType} exclusive onChange={handleLoginTypeChange} fullWidth sx={{ mb: 2 }}>
                    <ToggleButton value="customer">Patient</ToggleButton>
                    <ToggleButton value="hospital">Hospital</ToggleButton>
                </ToggleButtonGroup>

                <Box component="form" onSubmit={handleLogin} noValidate sx={{ width: '100%' }}>
                    <Typography variant="h6" sx={{ textAlign: 'center', mb: 1 }}>
                        {loginType === 'customer' ? 'Patient Login' : 'Hospital Login'}
                    </Typography>
                    <TextField onChange={onChange} value={credentials.email} margin="normal" required fullWidth id="email" label="Email Address" name="email" />
                    <TextField onChange={onChange} value={credentials.password} margin="normal" required fullWidth name="password" label="Password" type="password" id="password" />
                    <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
                        Sign In
                    </Button>
                    {loginType === 'customer' && (
                        <Box sx={{ textAlign: 'right', width: '100%' }}>
                            <Link component={RouterLink} to="/signup" variant="body2">
                                {"Don't have an account? Sign Up"}
                            </Link>
                        </Box>
                    )}
                </Box>
            </Paper>
        </Container>
    );
}

export default Login;