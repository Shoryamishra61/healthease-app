import React, { useContext } from 'react';
import { Typography, Box, Avatar } from '@mui/material';
import UserContext from '../context/UserContext';
import { deepOrange } from '@mui/material/colors';

function WelcomeHeader() {
    const { user } = useContext(UserContext);

    // Get the first letter of the user's name for the avatar
    const userInitial = user ? user.name.charAt(0).toUpperCase() : '?';

    return (
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 4, width: '100%' }}>
            <Avatar sx={{ bgcolor: deepOrange[500], width: 56, height: 56, mr: 2 }}>
                {userInitial}
            </Avatar>
            <Box>
                <Typography component="h1" variant="h4">
                    Welcome, {user ? user.name : 'Guest'}!
                </Typography>
                <Typography variant="subtitle1" color="text.secondary">
                    Ready to take control of your health today?
                </Typography>
            </Box>
        </Box>
    );
}

export default WelcomeHeader;