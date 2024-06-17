// Importing the mongoose module
import mongoose from 'mongoose';

// Defining the schema for an Event
const EventSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true, // Title is a required field
  },
  start: {
    type: Date,
    required: true, // Start date/time is a required field
  },
  end: {
    type: Date,
    required: true, // End date/time is a required field
  },
  description: {
    type: String, // Description is an optional field
  },
}, { timestamps: true }); // Automatically adds createdAt and updatedAt timestamps

// Creating the Event model from the schema
const Event = mongoose.model('Event', EventSchema);

// Exporting the Event model for use in other parts of the application
export default Event;
