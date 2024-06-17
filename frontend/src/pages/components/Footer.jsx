import * as React from 'react';
import Box from '@mui/material/Box'; // Importing Box component from Material-UI
import Container from '@mui/material/Container'; // Importing Container component from Material-UI
import IconButton from '@mui/material/IconButton'; // Importing IconButton component from Material-UI
import Link from '@mui/material/Link'; // Importing Link component from Material-UI
import Stack from '@mui/material/Stack'; // Importing Stack component from Material-UI
import Typography from '@mui/material/Typography'; // Importing Typography component from Material-UI

import GitHubIcon from '@mui/icons-material/GitHub'; // Importing GitHub icon from Material-UI icons
import LinkedInIcon from '@mui/icons-material/LinkedIn'; // Importing LinkedIn icon from Material-UI icons
import TwitterIcon from '@mui/icons-material/Twitter'; // Importing Twitter icon from Material-UI icons

const logoStyle = {
  width: '140px', // Logo width
  height: 'auto', // Logo height auto adjusts
};

// Copyright component displaying copyright information
function Copyright() {
  return (
    <Typography variant="body2" color="text.secondary" mt={1}>
      {'Copyright © '}
      <Link href="/">SOMA&nbsp;</Link>
      {new Date().getFullYear()}
    </Typography>
  );
}

// Footer component function
export default function Footer() {
  return (
    <Container
      sx={{
        display: 'flex', // Flex display
        flexDirection: 'column', // Column direction
        alignItems: 'center', // Center alignment
        gap: { xs: 4, sm: 8 }, // Gap between elements based on screen size
        py: { xs: 8, sm: 10 }, // Padding top and bottom based on screen size
        textAlign: { sm: 'center', md: 'left' }, // Text alignment based on screen size
      }}
    >
      {/* Box for organizing footer content */}
      <Box
        sx={{
          display: 'flex', // Flex display
          flexDirection: { xs: 'column', sm: 'row' }, // Column direction on small screens, row on medium screens
          width: '100%', // Full width
          justifyContent: 'space-between', // Space between items
        }}
      >
        {/* Links and copyright information */}
        <div>
          <Link color="text.secondary" href="#">
            Privacy Policy
          </Link>
          <Typography display="inline" sx={{ mx: 0.5, opacity: 0.5 }}>
            &nbsp;•&nbsp;
          </Typography>
          <Link color="text.secondary" href="#">
            Terms of Service
          </Link>
          <Copyright />
        </div>
        {/* Social media icons */}
        <Stack
          direction="row" // Row direction
          justifyContent="left" // Justify content to the left
          spacing={1} // Spacing between icons
          useFlexGap // Use flex gap
          sx={{
            color: 'text.secondary', // Text color
          }}
        >
          {/* GitHub icon button */}
          <IconButton
            color="inherit" // Inherit color
            href="#" // Link to GitHub
            aria-label="GitHub" // Aria label for accessibility
            sx={{ alignSelf: 'center' }} // Align self center
          >
            <GitHubIcon /> {/* GitHub icon */}
          </IconButton>
          {/* Twitter icon button */}
          <IconButton
            color="inherit" // Inherit color
            href="#" // Link to Twitter
            aria-label="Twitter" // Aria label for accessibility
            sx={{ alignSelf: 'center' }} // Align self center
          >
            <TwitterIcon /> {/* Twitter icon */}
          </IconButton>
          {/* LinkedIn icon button */}
          <IconButton
            color="inherit" // Inherit color
            href="#" // Link to LinkedIn
            aria-label="LinkedIn" // Aria label for accessibility
            sx={{ alignSelf: 'center' }} // Align self center
          >
            <LinkedInIcon /> {/* LinkedIn icon */}
          </IconButton>
        </Stack>
      </Box>
    </Container>
  );
}
