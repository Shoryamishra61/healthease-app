import React from 'react';
import { Container, Typography, Box, Button, Paper, Grid } from '@mui/material';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { Bar } from 'react-chartjs-2';

// Register the components Chart.js needs
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

// Mock data for our chart
const chartData = {
    labels: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
    datasets: [
        {
            label: 'Patient Admissions This Week',
            data: [65, 59, 80, 81, 56, 55, 40],
            backgroundColor: 'rgba(72, 169, 153, 0.6)',
            borderColor: 'rgba(72, 169, 153, 1)',
            borderWidth: 1,
        },
    ],
};

function StatCard({ title, value }) {
    return (
        <Paper sx={{ p: 2, textAlign: 'center' }}>
            <Typography variant="h6" color="text.secondary">{title}</Typography>
            <Typography variant="h4" sx={{ fontWeight: 'bold' }}>{value}</Typography>
        </Paper>
    );
}

function HospitalDashboard() {
    const handleLogout = () => {
        localStorage.removeItem('token');
        window.location.href = '/';
    };

    return (
        <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            <Typography variant="h4" gutterBottom sx={{ fontWeight: 'bold' }}>
                Hospital Management Dashboard
            </Typography>
            <Grid container spacing={3}>
                {/* Stat Cards */}
                <Grid item xs={12} sm={4}><StatCard title="Total Beds" value="250" /></Grid>
                <Grid item xs={12} sm={4}><StatCard title="Current Occupancy" value="82%" /></Grid>
                <Grid item xs={12} sm={4}><StatCard title="Doctors on Duty" value="48" /></Grid>

                {/* Main Chart */}
                <Grid item xs={12}>
                    <Paper sx={{ p: 2 }}>
                        <Bar
                            options={{
                                responsive: true,
                                plugins: {
                                    legend: { position: 'top' },
                                    title: { display: true, text: 'Weekly Patient Load' },
                                },
                            }}
                            data={chartData}
                        />
                    </Paper>
                </Grid>
                <Grid item xs={12} sx={{textAlign: 'center'}}>
                    <Button color="error" variant="outlined" sx={{ mt: 4 }} onClick={handleLogout}>
                        Logout
                    </Button>
                </Grid>
            </Grid>
        </Container>
    );
}

export default HospitalDashboard;