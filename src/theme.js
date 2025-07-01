import { createTheme } from '@mui/material/styles';

// This function returns a theme object based on the mode ('light' or 'dark')
export const getDesignTokens = (mode) => ({
    palette: {
      mode,
      ...(mode === 'light'
        ? {
            // Palette values for light mode
            primary: { main: '#00796b' },
            secondary: { main: '#1976d2' },
            background: { default: '#f4f7f6', paper: '#ffffff' },
          }
        : {
            // Palette values for dark mode
            primary: { main: '#48a999' },
            secondary: { main: '#63a4ff' },
            background: { default: '#121212', paper: 'rgba(30, 30, 30, 0.8)' }, // Dark paper with transparency
          }),
    },
    shape: {
      borderRadius: 8,
    },
    typography: {
      fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
      h4: { fontWeight: 600 },
      h5: { fontWeight: 600 },
    },
    components: {
      MuiPaper: {
        styleOverrides: {
          root: ({ theme }) => ({
            color: theme.palette.text.primary, 
            transition: 'transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out',
            '&:hover': {
              transform: 'translateY(-5px)',
              boxShadow: `0px 10px 20px ${theme.palette.mode === 'light' ? 'rgba(0, 0, 0, 0.10)' : 'rgba(0, 0, 0, 0.20)'}`,
            },
          }),
        },
      },
      MuiButton: {
        styleOverrides: {
          root: {
            textTransform: 'none',
            boxShadow: 'none',
          },
        },
      },
    },
});