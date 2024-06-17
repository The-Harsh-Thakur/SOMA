// Importing the Event model
import Event from '../models/Event.js';

// Function to add a new event
// Takes event details as a parameter, creates a new event, and saves it to the database
export const addEvent = async (details) => {
  const { title, start, end, description } = details; // Extract event details from the input parameter
  const newEvent = new Event({ title, start, end, description }); // Create a new Event instance
  await newEvent.save(); // Save the new event to the database
  return newEvent; // Return the saved event
};

// Function to remove an event by title
// Finds an event by its title and deletes it from the database
export const removeEvent = async (title) => {
  await Event.findOneAndDelete({ title }); // Find and delete the event with the specified title
};

// Function to get all events
// Retrieves all events from the database and returns them
export const getEvents = async () => {
  return await Event.find(); // Find and return all events from the database
};
