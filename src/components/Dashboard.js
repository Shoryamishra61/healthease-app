import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // <-- This line was missing
import { Container, Grid } from '@mui/material';
import SymptomForm from './SymptomForm';
import MedicationScanner from './MedicationScanner';
import DashboardLinks from './DashboardLinks';
import WelcomeHeader from './WelcomeHeader';

function Dashboard() {
    const navigate = useNavigate();

    useEffect(() => {
        if (!localStorage.getItem('token')) {
            navigate('/');
        }
    }, [navigate]);

    return (
        <Container component="main" maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            <WelcomeHeader />
            <Grid container spacing={3}>
                <Grid item xs={12} md={7}>
                    <SymptomForm />
                </Grid>
                <Grid item xs={12} md={5}>
                    <Grid container direction="column" spacing={3}>
                        <Grid item><MedicationScanner /></Grid>
                        <Grid item><DashboardLinks /></Grid>
                    </Grid>
                </Grid>
            </Grid>
        </Container>
    );
}

export default Dashboard;