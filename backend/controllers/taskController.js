// Importing the Task model
import Task from '../models/Task.js';

// Function to add a new task
// Takes a task description as a parameter, creates a new task, and saves it to the database
export const addTask = async (description) => {
  const newTask = new Task({ description }); // Create a new Task instance with the provided description
  await newTask.save(); // Save the new task to the database
  return newTask; // Return the saved task object
};

// Function to remove a task by description
// Finds a task by its description and deletes it from the database
export const removeTask = async (description) => {
  await Task.findOneAndDelete({ description }); // Find and delete the task with the specified description
};

// Function to get all tasks
// Retrieves all tasks from the database and returns them
export const getTasks = async () => {
  return await Task.find(); // Find and return all tasks from the database
};
