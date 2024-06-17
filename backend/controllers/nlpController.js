// Importing required modules and functions
import nlp from 'compromise';
import { addTask, removeTask } from './taskController.js';
import { addEvent, removeEvent } from './eventController.js';

// Controller function to handle NLP (Natural Language Processing) requests
export const handleNLP = async (req, res) => {
  const { prompt } = req.body; // Extract the prompt from the request body
  let responseMessage = '';

  const doc = nlp(prompt); // Process the prompt with NLP

  if (doc.has('add task')) {
    // Handling 'add task' command
    const taskDescription = doc.match('add task [*]').out('text').replace('add task', '').trim();
    if (taskDescription) {
      await addTask(taskDescription); // Add the task
      responseMessage = `Task added: ${taskDescription}`;
    } else {
      responseMessage = 'Task description is missing';
    }
  } else if (doc.has('remove task')) {
    // Handling 'remove task' command
    const taskDescription = doc.match('remove task [*]').out('text').replace('remove task', '').trim();
    if (taskDescription) {
      await removeTask(taskDescription); // Remove the task
      responseMessage = `Task removed: ${taskDescription}`;
    } else {
      responseMessage = 'Task description is missing';
    }
  } else if (doc.has('add event')) {
    // Handling 'add event' command
    const eventDetailsString = doc.match('add event [*]').out('text').replace('add event', '').trim();
    try {
      const eventDetails = parseEventDetails(eventDetailsString); // Parse event details
      await addEvent(eventDetails); // Add the event
      responseMessage = `Event added: ${eventDetails.title}`;
    } catch (error) {
      responseMessage = `Error adding event: ${error.message}`;
    }
  } else if (doc.has('remove event')) {
    // Handling 'remove event' command
    const eventTitle = doc.match('remove event [*]').out('text').replace('remove event', '').trim();
    if (eventTitle) {
      await removeEvent(eventTitle); // Remove the event
      responseMessage = `Event removed: ${eventTitle}`;
    } else {
      responseMessage = 'Event title is missing';
    }
  } else {
    responseMessage = 'Unrecognized command'; // Handle unrecognized commands
  }

  res.json({ message: responseMessage }); // Respond with the result message
};

// Helper function to parse event details from a string
const parseEventDetails = (details) => {
  const [title, start, end, description] = details.split(',').map(s => s.trim());

  if (!title || !start || !end) {
    throw new Error('Invalid event details format. Expected format: "title, start, end, description"');
  }

  return {
    title,
    start: new Date(start),
    end: new Date(end),
    description: description || '', // Description is optional
  };
};
