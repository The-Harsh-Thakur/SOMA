// Importing required modules and the Event model
import express from 'express';
import Event from '../models/Event.js';

// Initialize the Express router
const router = express.Router();

// Get all events
// This route handles GET requests to the root URL and returns a list of all events from the database.
router.get('/', async (req, res) => {
  try {
    const events = await Event.find(); // Fetch all events from the database
    res.status(200).json(events); // Respond with the events in JSON format
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong' }); // Handle any errors that occur
  }
});

// Add a new event
// This route handles POST requests to the root URL and creates a new event with the provided details.
router.post('/', async (req, res) => {
  const { title, start, end, description } = req.body; // Extract event details from the request body

  const newEvent = new Event({
    title, // Set the title of the new event
    start, // Set the start time of the new event
    end, // Set the end time of the new event
    description, // Set the description of the new event
  });

  try {
    await newEvent.save(); // Save the new event to the database
    res.status(201).json(newEvent); // Respond with the newly created event in JSON format
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong' }); // Handle any errors that occur
  }
});

// Delete an event
// This route handles DELETE requests to a URL with an event ID and deletes the specified event.
router.delete('/:id', async (req, res) => {
  const { id } = req.params; // Extract the event ID from the request parameters

  try {
    const event = await Event.findByIdAndDelete(id); // Find the event by ID and delete it
    if (!event) return res.status(404).json({ message: 'Event not found' }); // Handle case where event is not found
    res.status(200).json({ message: 'Event deleted' }); // Respond with a success message
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong' }); // Handle any errors that occur
  }
});

// Export the router for use in other parts of the application
export default router;
