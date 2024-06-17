import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import AppAppBar from './components/AppAppBar';
import Hero from './components/Hero';
import Highlights from './components/Highlights';
import Footer from './components/Footer';

export default function Home() {
  const [mode] = React.useState('light'); // State for color mode (currently unused in this component)
  const defaultTheme = createTheme({ palette: { mode } }); // Create theme based on color mode

  return (
    <ThemeProvider theme={defaultTheme}>
      <CssBaseline /> {/* Apply global CSS reset */}
      <AppAppBar /> {/* Render application app bar */}
      <Hero title="Dashboard"/> {/* Render hero section with title "Dashboard" */}
      <Box sx={{ bgcolor: 'background.default' }}> {/* Main content section with default background color */}
        <Divider /> {/* Divider for visual separation */}
        <Highlights /> {/* Render highlights component */}
        <Divider /> {/* Divider for visual separation */}
        <Footer /> {/* Render footer component */}
      </Box>
    </ThemeProvider>
  );
}
