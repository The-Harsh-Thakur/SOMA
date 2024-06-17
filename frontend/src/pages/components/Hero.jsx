import * as React from 'react';
import { alpha } from '@mui/material'; // Importing alpha function from Material-UI
import Box from '@mui/material/Box'; // Importing Box component from Material-UI
import Container from '@mui/material/Container'; // Importing Container component from Material-UI
import Stack from '@mui/material/Stack'; // Importing Stack component from Material-UI
import Typography from '@mui/material/Typography'; // Importing Typography component from Material-UI

// Hero component function with props
export default function Hero({ title }) {
  return (
    <Box
      id="hero"
      sx={(theme) => ({
        width: '100%', // Full width
        // Background image gradient based on theme mode
        backgroundImage:
          theme.palette.mode === 'light'
            ? 'linear-gradient(180deg, #CEE5FD, #FFF)' // Light mode gradient
            : `linear-gradient(#02294F, ${alpha('#090E10', 0.0)})`, // Dark mode gradient with alpha
        backgroundSize: '100% 20%', // Background size
        backgroundRepeat: 'no-repeat', // No repeat
      })}
    >
      <Container
        sx={{
          display: 'flex', // Flex display
          flexDirection: 'column', // Column direction
          alignItems: 'center', // Center alignment
          pt: { xs: 14, sm: 20 }, // Padding top based on screen size
          pb: { xs: 8, sm: 12 }, // Padding bottom based on screen size
        }}
      >
        <Stack spacing={2} useFlexGap sx={{ width: { xs: '100%', sm: '70%' } }}>
          {/* Typography for displaying title */}
          <Typography
            variant="h1" // Heading variant
            sx={{
              display: 'flex', // Flex display
              flexDirection: { xs: 'column', md: 'row' }, // Column direction on small screens, row on medium screens
              alignSelf: 'center', // Align self center
              textAlign: 'center', // Text align center
              fontSize: 'clamp(3.5rem, 10vw, 4rem)', // Responsive font size
              fontFamily: 'Montserrat, sans-serif', // Font family
            }}
          >
            {title} {/* Title text */}
          </Typography>
        </Stack>
      </Container>
    </Box>
  );
}
