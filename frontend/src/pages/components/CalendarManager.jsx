import React, { useState, useEffect } from 'react';
// Importing Calendar and momentLocalizer from react-big-calendar
import { Calendar, momentLocalizer } from 'react-big-calendar';
// Importing moment library for date handling
import moment from 'moment';
// Importing default styles for react-big-calendar
import 'react-big-calendar/lib/css/react-big-calendar.css';
// Importing necessary components from Material-UI
import {
  Box,
  Container,
  Grid,
  Typography,
  TextField,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  createTheme,
  ThemeProvider,
} from '@mui/material';

// Creating a moment localizer for react-big-calendar
const localizer = momentLocalizer(moment);

// Creating a custom Material-UI theme
const customTheme = createTheme({
  palette: {
    primary: {
      main: '#ffffff',
    },
    text: {
      primary: '#ffffff',
    },
    background: {
      default: '#06090a',
      paper: '#06090a',
    },
  },
  components: {
    // Overrides for MuiDialog component
    MuiDialog: {
      styleOverrides: {
        paper: {
          backgroundColor: '#06090a',
          color: 'white',
        },
      },
    },
    // Overrides for MuiTextField component
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiInputBase-input': {
            color: 'white',
          },
          '& .MuiInputLabel-root': {
            color: 'white',
          },
          '& .MuiOutlinedInput-root': {
            '& fieldset': {
              borderColor: 'white',
            },
            '&:hover fieldset': {
              borderColor: 'white',
            },
            '&.Mui-focused fieldset': {
              borderColor: 'white',
            },
          },
        },
      },
    },
    // Overrides for MuiButton component
    MuiButton: {
      styleOverrides: {
        root: {
          color: 'black',
          backgroundColor: 'white',
          '&:hover': {
            backgroundColor: '#e0e0e0',
          },
        },
      },
    },
  },
});

// CalendarManager component
const CalendarManager = () => {
  // State for managing events
  const [events, setEvents] = useState([]);
  // State for managing dialog open/close
  const [open, setOpen] = useState(false);
  // State for managing new event details
  const [newEvent, setNewEvent] = useState({
    title: '',
    start: new Date(),
    end: new Date(),
    description: '',
  });

  // Fetch events from API on component mount
  useEffect(() => {
    fetchEvents();
  }, []);

  // Function to fetch events from API
  const fetchEvents = async () => {
    try {
      const response = await fetch('http://localhost:3000/api/events');
      if (!response.ok) {
        throw new Error('Failed to fetch events');
      }
      const data = await response.json();
      setEvents(data); // Update events state with fetched data
    } catch (error) {
      console.error('Error fetching events:', error);
    }
  };

  // Function to add a new event
  const addEvent = async () => {
    try {
      const response = await fetch('http://localhost:3000/api/events', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newEvent), // Send new event data to API
      });

      if (!response.ok) {
        throw new Error('Failed to add event');
      }

      const createdEvent = await response.json();
      setEvents((prevEvents) => [...prevEvents, createdEvent]); // Add newly created event to events state
      setOpen(false); // Close the dialog
    } catch (error) {
      console.error('Error adding event:', error);
    }
  };

  // Function to handle selection of a time slot in the calendar
  const handleSelectSlot = ({ start, end }) => {
    setNewEvent({ ...newEvent, start, end }); // Update start and end time of newEvent state
    setOpen(true); // Open the dialog for adding a new event
  };

  // JSX structure of the component
  return (
    <ThemeProvider theme={customTheme}>
      <Box
        id="highlights"
        sx={{
          pt: { xs: 4, sm: 12 },
          pb: { xs: 8, sm: 16 },
          color: 'white',
          bgcolor: '#06090a',
        }}
      >
        <Container
          sx={{
            position: 'relative',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: { xs: 3, sm: 6 },
          }}
        >
          <Grid container spacing={2} sx={{ width: { sm: '100%', md: '80%' }, textAlign: { sm: 'left', md: 'center' } }}>
            <Grid item xs={12}>
              <Typography variant="h6" sx={{ color: 'white' }}>
                {moment().format('MMMM YYYY')}
              </Typography>
              <Calendar
                localizer={localizer}
                events={events}
                startAccessor="start"
                endAccessor="end"
                views={['month', 'week', 'day']}
                style={{
                  height: 500,
                  backgroundColor: '#ffffff',
                  borderRadius: '8px',
                  padding: '16px',
                }}
                selectable
                onSelectSlot={handleSelectSlot}
              />
            </Grid>
          </Grid>
        </Container>
        {/* Dialog for adding new event */}
        <Dialog open={open} onClose={() => setOpen(false)}>
          <DialogTitle>Add Event</DialogTitle>
          <DialogContent>
            <TextField
              autoFocus
              margin="dense"
              label="Title"
              type="text"
              fullWidth
              value={newEvent.title}
              onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })}
            />
            <TextField
              margin="dense"
              label="Description"
              type="text"
              fullWidth
              value={newEvent.description}
              onChange={(e) => setNewEvent({ ...newEvent, description: e.target.value })}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setOpen(false)}>Cancel</Button>
            <Button onClick={addEvent}>Add</Button>
          </DialogActions>
        </Dialog>
      </Box>
    </ThemeProvider>
  );
};

export default CalendarManager;
