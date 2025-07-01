import React, { useContext } from 'react';
import { Button, Box, Paper, Typography } from '@mui/material';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import UserContext from '../context/UserContext';

function DashboardLinks(props) {
    const { logoutUser } = useContext(UserContext);
    const navigate = useNavigate();

    const handleLogout = () => {
        logoutUser();
        navigate('/');
    }

    return (
        <Paper sx={{ p: 3 , ...props.style}}>
            <Typography variant="h6" gutterBottom>Quick Actions</Typography>
            <Box sx={{ width: '100%' }}>
                <Button component={RouterLink} to="/beds" variant="outlined" fullWidth sx={{ mb: 2 }}>
                    Find Available Beds
                </Button>
                <Button component={RouterLink} to="/records" variant="outlined" fullWidth sx={{ mb: 2 }}>
                    View Health Records
                </Button>
                 <Button 
                    variant="contained" 
                    color="error" 
                    fullWidth 
                    onClick={handleLogout}
                >
                    Logout
                </Button>
            </Box>
        </Paper>
    );
}

export default DashboardLinks;