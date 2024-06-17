import React, { useState } from 'react';
import { Box, Container, TextField, Button, Typography, Divider, Grid } from '@mui/material';
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import AppAppBar from './components/AppAppBar';
import Hero from './components/Hero';
import Footer from './components/Footer';

const Queries = () => {
  // State variables
  const [prompt, setPrompt] = useState(''); // State to store user input prompt
  const [response, setResponse] = useState(''); // State to store server response
  const [mode, setMode] = useState('light'); // State for current color mode (light/dark)
  const defaultTheme = createTheme({ palette: { mode } }); // Create a theme based on current mode

  // Function to handle form submission
  const handleSubmit = async () => {
    try {
      // Send POST request to server with user prompt
      const res = await fetch('http://localhost:3000/api/nlp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt }),
      });

      if (!res.ok) {
        throw new Error('Failed to process NLP prompt');
      }

      // Retrieve response data from server
      const data = await res.json();
      setResponse(data.message); // Update response state with server message
    } catch (error) {
      console.error('Error:', error);
      setResponse('Error processing the prompt'); // Handle error if request fails
    }
  };

  // Function to toggle between light and dark color mode
  const toggleColorMode = () => {
    setMode((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  // Render JSX
  return (
    <ThemeProvider theme={defaultTheme}>
      <CssBaseline /> {/* Apply global CSS reset */}
      <AppAppBar mode={mode} toggleColorMode={toggleColorMode} /> {/* Header component with color mode toggle */}
      <Hero title="Queries" /> {/* Hero section with title */}
      <Divider /> {/* Divider for visual separation */}

      {/* Main content section */}
      <Box sx={{ 
        pt: { xs: 4, sm: 12 }, // Padding top based on viewport size
        pb: { xs: 8, sm: 16 }, // Padding bottom based on viewport size
        color: 'white', // Text color
        bgcolor: '#06090a', // Background color
      }}>
        <Container
          sx={{
            position: 'relative',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: { xs: 3, sm: 6 }, // Gap between child elements based on viewport size
          }}
        >
          <Grid container spacing={2} sx={{ width: { sm: '100%', md: '60%' }, textAlign: { sm: 'left', md: 'center' } }}>
            <Grid item xs={12}>
              {/* Text field for entering query */}
              <TextField
                fullWidth
                label="Enter Your Query"
                variant="outlined"
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                InputLabelProps={{ style: { color: 'white' } }} // Styling for input label
                InputProps={{ style: { color: 'white' } }} // Styling for input text
                sx={{ 
                  '.MuiOutlinedInput-root': {
                    '& fieldset': {
                      borderColor: 'white', // Border color when not focused
                    },
                    '&:hover fieldset': {
                      borderColor: 'white', // Border color on hover
                    },
                    '&.Mui-focused fieldset': {
                      borderColor: 'white', // Border color when focused
                    },
                  },
                }}
              />
            </Grid>
            <Grid item xs={12}>
              {/* Submit button */}
              <Button
                fullWidth 
                variant="contained" 
                onClick={handleSubmit} // Call handleSubmit function on click
                sx={{ bgcolor: 'white', color: 'black', '&:hover': { bgcolor: '#e0e0e0' } }} // Button styling
              >
                Submit
              </Button>

              {/* Display response if available */}
              {response && (
                <Typography variant="body1" sx={{ mt: 2 }}>
                  Response: {response}
                </Typography>
              )}
            </Grid>
          </Grid>
        </Container>
      </Box>

      <Divider /> {/* Divider for visual separation */}
      <Footer /> {/* Footer component */}
    </ThemeProvider>
  );
};

export default Queries; // Export Queries component
