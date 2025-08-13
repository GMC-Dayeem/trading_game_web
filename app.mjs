// app.mjs

// Importing necessary libraries and modules
import express from 'express'; // Express web framework for node.js
import mongoose from 'mongoose'; // Mongoose library for MongoDB interactions
import dotenv from 'dotenv'; // Dotenv for loading environment variables from .env file
import path from 'path';
import userRoutes from './routes/userRoutes.mjs'; // User-related routes
import adminRoutes from './routes/adminRoutes.mjs'; // Admin-related routes
import { fileURLToPath } from 'url';
import { dirname } from 'path';


// Load environment variables from .env file into process.env
dotenv.config(); 

const app = express(); // Creating an Express app
const PORT = process.env.PORT || 3000; // Define the port to run the server on
// MongoDB connection URI. Replace <username>:<password> with actual credentials
const MONGO_URI = 'mongodb+srv://mgmchowdhury:HBTOIEwkif0cEdoT@cluster0.xpp7c6k.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';

// Middleware to parse JSON bodies
app.use(express.json());


// Connect to MongoDB using Mongoose
mongoose.connect(MONGO_URI)
  .then(() => console.log('MongoDB connected...')) // Log on successful connection
  .catch(err => console.log('Error connecting to MongoDB:', err)); // Log on connection error

// Registering route middlewares for user and admin routes
app.use('/api/users', userRoutes); 
app.use('/api/admin', adminRoutes); 
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
app.use(express.static(path.join(__dirname, 'public')));

// Route to serve the home.html page when the root URL is accessed
app.get('/', (req, res) => {
  // Set the Content-Type header to indicate that HTML content is being sent
  res.setHeader('Content-Type', 'text/html');
  // Send the home.html file as the response
  res.sendFile(path.join(__dirname, 'public', 'home.html'));
});

// Endpoint to validate admin access key
app.post('/api/admin/access', async (req, res) => {
  const { accessKey } = req.body;

  // Define the valid access keys
  const validAccessKeys = ['1234', '4321', '0000', '1111'];

  // Validate access key
  if (validAccessKeys.includes(accessKey)) {
      // Access key is valid
      res.sendStatus(200);
  } else {
      // Access key is invalid
      res.sendStatus(401);
    }
});

// Start the server and listen on the defined port
const server = app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

// Export the app for further use, e.g., in testing
export default app;
