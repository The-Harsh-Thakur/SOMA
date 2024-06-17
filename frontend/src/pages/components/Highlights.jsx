import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import TaskOutlinedIcon from '@mui/icons-material/TaskOutlined';
import EditCalendarOutlinedIcon from '@mui/icons-material/EditCalendarOutlined';
import { useNavigate } from 'react-router-dom';

// Data for each highlight item
const items = [
  {
    icon: <TaskOutlinedIcon />, // Icon for scheduling tasks
    title: 'Schedule Tasks',
    description:
      'Automate your workflow with scheduled tasks that run at your specified times or intervals effortlessly.',
    link: '/task', // Link to task management page
  },
  {
    icon: <EditCalendarOutlinedIcon />, // Icon for managing calendars
    title: 'Manage Calendars',
    description:
      'Easily organize and coordinate your events and appointments with calendar management.',
    link: '/calendar', // Link to calendar management page
  },
  // Add more items here if needed
];

// Main component function
export default function Highlights() {
  const navigate = useNavigate(); // Hook to navigate between pages

  // Function to handle click on a highlight item
  const handleItemClick = (link) => {
    navigate(link); // Navigate to the specified link
  };

  return (
    <Box
      id="highlights"
      sx={{
        pt: { xs: 4, sm: 12 }, // Padding top based on screen size
        pb: { xs: 8, sm: 16 }, // Padding bottom based on screen size
        color: 'white', // Text color
        bgcolor: '#06090a', // Background color
      }}
    >
      <Container
        sx={{
          position: 'relative',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: { xs: 3, sm: 6 }, // Gap between elements based on screen size
        }}
      >
        <Box
          sx={{
            width: { sm: '100%', md: '60%' }, // Width of content based on screen size
            textAlign: { sm: 'left', md: 'center' }, // Text alignment based on screen size
          }}
        >
          <Typography component="h2" variant="h4">
            Welcome,
          </Typography>
          <br />
          <Typography variant="body1" sx={{ color: 'grey.400' }}>
            What do you need help with today?
          </Typography>
        </Box>
        <Grid container spacing={5}>
          {items.map((item, index) => (
            <Grid item xs={6} key={index}> {/* Grid item for each highlight, half width on smaller screens */}
              <Stack
                direction="column"
                color="inherit"
                component={Card} // Use Card component for styling
                spacing={1} // Spacing between elements in the stack
                useFlexGap // Use flex gap for spacing
                onClick={() => handleItemClick(item.link)} // Handle click to navigate
                sx={{
                  p: 3, // Padding inside the card
                  height: '100%', // Full height of the stack
                  border: '1px solid', // Border style
                  borderColor: 'grey.800', // Border color
                  background: 'transparent', // Transparent background
                  backgroundColor: 'grey.900', // Background color
                  cursor: 'pointer', // Pointer cursor on hover
                }}
              >
                <Box sx={{ opacity: '50%' }}>{item.icon}</Box> {/* Icon with reduced opacity */}
                <div>
                  <Typography fontWeight="medium" gutterBottom>
                    {item.title}
                  </Typography>
                  <Typography variant="body2" sx={{ color: 'grey.400' }}>
                    {item.description}
                  </Typography>
                </div>
              </Stack>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}
