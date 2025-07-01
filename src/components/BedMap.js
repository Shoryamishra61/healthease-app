import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { hospitals } from '../data/hospitalData';
import L from 'leaflet';
import { Container, Typography, Paper } from '@mui/material';

// --- Custom Icon Logic ---
// Function to get the right color-coded icon based on bed status
const getIcon = (status) => {
    let iconUrl;
    if (status === 'Available') {
        iconUrl = 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png';
    } else if (status === 'Limited') {
        iconUrl = 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-orange.png';
    } else { // 'Full'
        iconUrl = 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png';
    }
    return new L.Icon({
        iconUrl: iconUrl,
        shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
        iconSize: [25, 41],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34],
        shadowSize: [41, 41]
    });
};

function BedMap() {
    // The map will be centered on Surat
    const mapCenter = [21.1702, 72.8311]; 

    return (
        <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            <Typography variant="h4" gutterBottom>
                Live Hospital Bed Availability
            </Typography>
            <Paper sx={{ height: '75vh', width: '100%', overflow: 'hidden', borderRadius: 2 }}>
                <MapContainer center={mapCenter} zoom={12} style={{ height: '100%', width: '100%' }}>
                    <TileLayer
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                    
                    {/* Loop through our hospital data and create a marker for each one */}
                    {hospitals.map((hospital, index) => (
                        <Marker key={index} position={hospital.position} icon={getIcon(hospital.beds)}>
                            <Popup>
                                <b>{hospital.name}</b><br />
                                Status: {hospital.beds}<br />
                                Available Beds: {hospital.capacity}
                            </Popup>
                        </Marker>
                    ))}
                </MapContainer>
            </Paper>
        </Container>
    );
}

export default BedMap;