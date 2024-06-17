import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import AppAppBar from './components/AppAppBar'; // Import application app bar component
import Hero from './components/Hero'; // Import hero component
import Footer from './components/Footer'; // Import footer component
import CalendarManager from './components/CalendarManager'; // Import calendar manager component

export default function Calendar() {
  const [mode, setMode] = React.useState('light'); // State for color mode (default: light)
  const defaultTheme = createTheme({ palette: { mode } }); // Create theme based on color mode

  // Function to toggle between light and dark color mode
  const toggleColorMode = () => {
    setMode((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <CssBaseline /> {/* Apply global CSS reset */}
      <AppAppBar mode={mode} toggleColorMode={toggleColorMode} /> {/* Render application app bar with color mode and toggle function */}
      <Hero title="Manage Calendar"/> {/* Render hero section with title "Manage Calendar" */}
      <Divider /> {/* Divider for visual separation */}
      <CalendarManager /> {/* Render calendar manager component */}
      <Divider /> {/* Divider for visual separation */}
      <Footer /> {/* Render footer component */}
    </ThemeProvider>
  );
}
