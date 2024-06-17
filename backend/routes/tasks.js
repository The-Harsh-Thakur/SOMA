import express from 'express';
import Task from '../models/Task.js';

const router = express.Router();

// Get all tasks
// This route handles GET requests to the root URL and returns a list of all tasks from the database.
router.get('/', async (req, res) => {
  try {
    const tasks = await Task.find(); // Fetch all tasks from the database
    res.status(200).json(tasks); // Respond with the tasks in JSON format
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong' }); // Handle any errors that occur
  }
});

// Add a new task
// This route handles POST requests to the root URL and creates a new task with the provided description.
router.post('/', async (req, res) => {
  const { description } = req.body; // Extract the task description from the request body

  const newTask = new Task({
    description, // Set the description of the new task
    completed: false, // Set the completed status to false by default
  });

  try {
    await newTask.save(); // Save the new task to the database
    res.status(201).json(newTask); // Respond with the newly created task in JSON format
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong' }); // Handle any errors that occur
  }
});

// Delete a task
// This route handles DELETE requests to a URL with a task ID and deletes the specified task.
router.delete('/:id', async (req, res) => {
  const { id } = req.params; // Extract the task ID from the request parameters

  try {
    const task = await Task.findByIdAndDelete(id); // Find the task by ID and delete it
    if (!task) return res.status(404).json({ message: 'Task not found' }); // Handle case where task is not found
    res.status(200).json({ message: 'Task deleted' }); // Respond with a success message
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong' }); // Handle any errors that occur
  }
});

export default router;
