import React, { useState, useEffect } from 'react';
import { Box, Container, Grid, TextField, Button, List, ListItem, ListItemText, IconButton, Typography } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

const TaskManager = () => {
  const [tasks, setTasks] = useState([]); // State to hold tasks
  const [description, setDescription] = useState(''); // State for new task description

  useEffect(() => {
    fetchTasks(); // Fetch tasks on component mount
  }, []);

  // Function to fetch tasks from server
  const fetchTasks = async () => {
    try {
      const response = await fetch('http://localhost:3000/api/tasks'); // Fetch tasks from API
      if (!response.ok) {
        throw new Error('Failed to fetch tasks'); // Handle fetch error
      }
      const data = await response.json(); // Parse JSON response
      setTasks(data); // Update tasks state with fetched data
    } catch (error) {
      console.error('Error fetching tasks:', error); // Log error if fetch fails
    }
  };

  // Function to add a new task
  const addTask = async () => {
    if (!description.trim()) {
      return; // If description is empty, do nothing
    }

    try {
      const response = await fetch('http://localhost:3000/api/tasks', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json', // Set headers for JSON content
        },
        body: JSON.stringify({ description }), // Send new task description in request body
      });

      if (!response.ok) {
        throw new Error('Failed to add task'); // Handle add task error
      }

      const newTask = await response.json(); // Parse JSON response for new task
      setTasks((prevTasks) => [...prevTasks, newTask]); // Update tasks state with new task
      setDescription(''); // Clear description input after adding task
    } catch (error) {
      console.error('Error adding task:', error); // Log error if add task fails
    }
  };

  // Function to delete a task by ID
  const deleteTask = async (id) => {
    try {
      const response = await fetch(`http://localhost:3000/api/tasks/${id}`, {
        method: 'DELETE', // Send DELETE request to delete task
      });

      if (!response.ok) {
        throw new Error('Failed to delete task'); // Handle delete task error
      }

      setTasks((prevTasks) => prevTasks.filter((task) => task._id !== id)); // Update tasks state after deleting task
    } catch (error) {
      console.error('Error deleting task:', error); // Log error if delete task fails
    }
  };

  return (
    <Box
      id="highlights"
      sx={{
        pt: { xs: 4, sm: 12 },
        pb: { xs: 8, sm: 16 },
        color: 'white',
        bgcolor: '#06090a', // Set background color
      }}
    >
      <Container
        sx={{
          position: 'relative',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: { xs: 3, sm: 6 }, // Set gap between items in grid
        }}
      >
        <Grid container spacing={2} sx={{ width: { sm: '100%', md: '60%' }, textAlign: { sm: 'left', md: 'center' } }}>
          <Grid item xs={12}>
            {/* Text field for entering new task */}
            <TextField
              fullWidth
              label="New Task"
              variant="outlined"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              InputLabelProps={{ style: { color: 'white' } }} // Set input label text color
              InputProps={{ style: { color: 'white' } }} // Set input text color
              sx={{
                '.MuiOutlinedInput-root': {
                  '& fieldset': {
                    borderColor: 'white', // Set input border color
                  },
                  '&:hover fieldset': {
                    borderColor: 'white', // Set input border color on hover
                  },
                  '&.Mui-focused fieldset': {
                    borderColor: 'white', // Set input border color when focused
                  },
                },
              }}
            />
          </Grid>
          <Grid item xs={12}>
            {/* Button to add new task */}
            <Button
              fullWidth
              variant="contained"
              onClick={addTask}
              sx={{ bgcolor: 'white', color: 'black', '&:hover': { bgcolor: '#e0e0e0' } }} // Set button background and text color
            >
              Add Task
            </Button>
          </Grid>
          <Grid item xs={12}>
            {/* Display list of tasks */}
            {tasks.length > 0 && (
              <Typography variant="h6" sx={{ color: 'white' }}>
                Your Tasks
              </Typography>
            )}
            <List>
              {tasks.map((task) => (
                <ListItem key={task._id} secondaryAction={
                  <IconButton edge="end" aria-label="delete" onClick={() => deleteTask(task._id)}>
                    <DeleteIcon sx={{ color: 'white' }} /> {/* Delete icon with white color */}
                  </IconButton>
                }>
                  <ListItemText primary={task.description} primaryTypographyProps={{ style: { color: 'white' } }} /> {/* Task description with white text color */}
                </ListItem>
              ))}
            </List>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default TaskManager;
