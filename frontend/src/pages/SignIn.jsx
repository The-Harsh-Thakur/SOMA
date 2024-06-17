import React, { useContext, useState } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { AuthContext } from '../context/AuthContext';

const theme = createTheme({
  palette: {
    primary: {
      main: '#322C2B', // Black color
    },
    secondary: {
      main: '#ffffff', // White color
    },
    text: {
      primary: '#322C2B', // Black color for text
      secondary: '#ffffff', // White color for text
    },
    background: {
      default: '#ffffff', // White background
      paper: '#ffffff', // White paper background
    },
    error: {
      main: '#f44336', // Default red color for errors
    },
  },
  typography: {
    fontFamily: 'Montserrat, sans-serif',
  },
  components: {
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
            borderColor: '#000000', // Black color for focused border
          },
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          backgroundColor: '#000000', // Black background color for buttons
          color: '#ffffff', // White text color for buttons
          '&:hover': {
            backgroundColor: '#333333', // Darker black on hover
          },
        },
      },
    },
    MuiLink: {
      styleOverrides: {
        root: {
          color: '#000000', // Black color for links
          '&:hover': {
            color: '#333333', // Darker black on hover
          },
        },
      },
    },
  },
});

export default function SignInSide() {
  const { signIn } = useContext(AuthContext);
  const [error, setError] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const email = data.get('email');
    const password = data.get('password');

    try {
      const response = await fetch('http://localhost:3000/api/auth/signin', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const result = await response.json();

      if (response.ok) {
        signIn(result.token);
      } else {
        setError(result.message);
      }
    } catch (error) {
      setError('Something went wrong. Please try again.');
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Grid container component="main" sx={{ height: '100vh' }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage: 'url(/background.jpg)', // Ensure this path is correct
            backgroundRepeat: 'no-repeat',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              height: '80vh'
            }}
          >
            <Typography component="h1" variant="h5" fontFamily="Montserrat, sans-serif">
              Sign in
            </Typography>
            <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
                InputLabelProps={{ style: { color: '#000000' } }} // Black color for label
                InputProps={{
                  style: { color: '#000000' }, // Black color for text input
                }}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                InputLabelProps={{ style: { color: '#000000' } }} // Black color for label
                InputProps={{
                  style: { color: '#000000' }, // Black color for text input
                }}
              />
              {error && <Typography color="error">{error}</Typography>}
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2, fontFamily: 'Montserrat, sans-serif' }}
              >
                Sign In
              </Button>
              <Grid container>
                <Grid item>
                  <Link href="/signup" variant="body2" fontFamily="Montserrat, sans-serif">
                    {"Don't have an account? Sign Up"}
                  </Link>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}
