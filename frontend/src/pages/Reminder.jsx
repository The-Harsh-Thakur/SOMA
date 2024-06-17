import * as React from 'react';

import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import Highlights from './components/Highlights';
import AppAppBar from './components/AppAppBar';
import Hero from './components/Hero';
import Footer from './components/Footer';

export default function Reminder() {
  const [mode, setMode] = React.useState('light');
  const defaultTheme = createTheme({ palette: { mode } });

  const toggleColorMode = () => {
    setMode((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <CssBaseline />
      <AppAppBar mode={mode} toggleColorMode={toggleColorMode} />
      <Hero title="Reminders"/>
      <Divider />
        <Highlights />
      <Divider />
      <Footer />
    </ThemeProvider>
  );
}