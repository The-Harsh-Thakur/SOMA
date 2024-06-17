// Importing required modules
import express from 'express';
import { processNLP } from '../controllers/nlp.js';

// Initialize the Express router
const router = express.Router();

// Route for processing NLP (Natural Language Processing) requests
// Handles POST requests to the root URL and calls the processNLP controller function
router.post('/', processNLP);

// Export the router for use in other parts of the application
export default router;
