import mongoose from "mongoose";

// Define the user schema for MongoDB
const userSchema = mongoose.Schema({
  // Username of the user
  username: {
    type: String,
    required: true, // Username is required
    unique: true, // Username must be unique
  },

  // Email of the user
  email: {
    type: String,
    required: true, // Email is required
    unique: true, // Email must be unique
  },

  // Password of the user
  password: {
    type: String,
    required: true, // Password is required
  },

  // Profile image of the user
  image: {
    type: String,
    default: "", // Default to an empty string if no image is provided
  },

  // Search history of the user
  searchHistory: {
    type: Array,
    default: [], // Default to an empty array if no search history is provided
  },
});

// Create and export the User model based on the user schema
export const User = mongoose.model("user", userSchema);
