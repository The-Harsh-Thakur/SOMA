// Importing the mongoose module
import mongoose from 'mongoose';

// Defining the schema for a Task
const TaskSchema = new mongoose.Schema({
  description: {
    type: String,
    required: true, // Description is a required field
  },
  completed: {
    type: Boolean,
    default: false, // Completed status defaults to false
  },
}, { timestamps: true }); // Automatically adds createdAt and updatedAt timestamps

// Creating the Task model from the schema
const Task = mongoose.model('Task', TaskSchema);

// Exporting the Task model for use in other parts of the application
export default Task;
