// Importing necessary modules and components
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home.jsx';
import Task from './pages/Task.jsx';
import Calendar from './pages/Calendar.jsx';
import Queries from './pages/Queries.jsx';

// App component
const App = () => {
  // Return JSX for routing configuration
  return (
    <Routes>
      <Route path="/" element={<Home />} /> {/* Route for Home page */}
      <Route path="/task" element={<Task />} /> {/* Route for Task page */}
      <Route path="/calendar" element={<Calendar />} /> {/* Route for Calendar page */}
      <Route path="/queries" element={<Queries />} /> {/* Route for Queries page */}
    </Routes>
  );
};

export default App; // Export the App component
