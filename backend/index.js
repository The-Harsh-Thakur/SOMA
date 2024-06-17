// Importing required modules and routes
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import taskRoutes from './routes/tasks.js';
import eventsRouter from './routes/events.js';
import { handleNLP } from './controllers/nlpController.js';

// Load environment variables from .env file
dotenv.config();

// Initialize the Express application
const app = express();

// Middleware for parsing JSON requests
app.use(express.json());
app.use(bodyParser.json());

// Middleware for enabling Cross-Origin Resource Sharing (CORS)
app.use(cors());

// Routes for handling tasks and events
app.use('/api/tasks', taskRoutes);
app.use('/api/events', eventsRouter);

// Route for handling NLP (Natural Language Processing) requests
app.post('/api/nlp', handleNLP);

// Define the port number for the server, defaulting to 3000 if not specified in environment variables
const PORT = process.env.PORT || 3000;

// Connect to MongoDB using the URI from environment variables
mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        console.log('Connected to MongoDB');
        // Start the server and listen on the specified port
        app.listen(PORT, () => {
            console.log(`Server is running on http://localhost:${PORT}`);
        });
    })
    .catch((error) => {
        // Log any errors that occur during the connection
        console.log('Error:', error);
    });
