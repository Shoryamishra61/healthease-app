import React, { useState, useMemo, useContext, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { getDesignTokens } from './theme';
import { Box, CssBaseline } from '@mui/material';
import UserContext from './context/UserContext';
import 'leaflet/dist/leaflet.css';

// Import Components
import AppHeader from './components/AppBar';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import Signup from './components/Signup';
import BedMap from './components/BedMap';
import HealthRecord from './components/HealthRecord';
import HospitalDashboard from './components/hospital/HospitalDashboard';
import VantaBackground from './components/VantaBackground'; // Import Vanta

function App() {
  const [mode, setMode] = useState('light');
  const { getUser } = useContext(UserContext);

  const toggleTheme = () => {
    setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
  };

  const theme = useMemo(() => createTheme(getDesignTokens(mode)), [mode]);

  useEffect(() => {
    if (localStorage.getItem('token')) {
      getUser();
    }
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <VantaBackground mode={mode} /> {/* The background now lives here, behind everything */}
        <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', position: 'relative', zIndex: 1 }}>
          <AppHeader mode={mode} toggleTheme={toggleTheme} />
          <Box component="main" sx={{ flexGrow: 1 }}>
            <Routes>
              {/* Note we no longer need to pass the mode prop down */}
              <Route path="/" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/beds" element={<BedMap />} />
              <Route path="/records" element={<HealthRecord />} />
              <Route path="/hospital/dashboard" element={<HospitalDashboard />} />
            </Routes>
          </Box>
        </Box>
      </Router>
    </ThemeProvider>
  );
}

export default App;