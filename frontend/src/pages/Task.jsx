import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import AppAppBar from './components/AppAppBar';
import Hero from './components/Hero';
import Footer from './components/Footer';
import TaskManager from './components/TaskManager';

export default function Task() {
  const [mode, setMode] = React.useState('light'); // State for managing light/dark mode
  const defaultTheme = createTheme({ palette: { mode } }); // Create a theme based on mode state

  // Function to toggle between light and dark mode
  const toggleColorMode = () => {
    setMode((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <CssBaseline /> {/* Applies global CSS reset and baseline styles */}
      <AppAppBar mode={mode} toggleColorMode={toggleColorMode} /> {/* App header with color mode toggle */}
      <Hero title="Task Management"/> {/* Hero section with title */}
      <Divider /> {/* Divider for visual separation */}
      <TaskManager /> {/* TaskManager component for managing tasks */}
      <Divider /> {/* Divider for visual separation */}
      <Footer /> {/* Footer component */}
    </ThemeProvider>
  );
}
