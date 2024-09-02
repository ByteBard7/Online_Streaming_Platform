import express from "express"; // Import Express framework for server setup
import authRoutes from "./routes/auth.route.js"; // Import routes for authentication
import movieRoutes from "./routes/movie.route.js"; // Import routes for movie-related endpoints
import tvRoutes from "./routes/tv.route.js"; // Import routes for TV show-related endpoints
import searchRoutes from "./routes/search.route.js"; // Import routes for search functionality

import { protectRoute } from "./middleware/protectRoute.js"; // Import middleware for route protection

import { ENV_VARS } from "./config/envVars.js"; // Import environment variables
import { connectDB } from "./config/db.js"; // Import function to connect to the database
import cookieParser from "cookie-parser"; // Import middleware for parsing cookies

const app = express(); // Create an Express application instance
const PORT = ENV_VARS.PORT; // Retrieve the port from environment variables

// Middleware to parse JSON request bodies
app.use(express.json());

// Middleware to parse cookies from request headers
app.use(cookieParser());

// Define routes for different API endpoints
app.use("/api/v1/auth", authRoutes); // Authentication routes
app.use("/api/v1/movie", protectRoute, movieRoutes); // Movie routes with route protection
app.use("/api/v1/tv", protectRoute, tvRoutes); // TV show routes with route protection
app.use("/api/v1/search", protectRoute, searchRoutes); // Search routes with route protection

// Start the server and connect to the database
app.listen(PORT, () => {
  console.log("Server started at http://localhost:" + PORT); // Log server start message
  connectDB(); // Connect to the database
});
