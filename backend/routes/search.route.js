import express from "express";
import {
  searchMovie,
  searchPerson,
  searchTv,
  getSearchHistory,
  removeItemFromSearchHistory,
} from "../controllers/search.controller.js";

const router = express.Router();

// Route to search for a person
// Handles GET requests to /person/:query
// :query is a placeholder for the search query
router.get("/person/:query", searchPerson);

// Route to search for a movie
// Handles GET requests to /movie/:query
// :query is a placeholder for the search query
router.get("/movie/:query", searchMovie);

// Route to search for a TV show
// Handles GET requests to /tv/:query
// :query is a placeholder for the search query
router.get("/tv/:query", searchTv);

// Route to get the search history of the logged-in user
// Handles GET requests to /history
router.get("/history", getSearchHistory);

// Route to remove an item from the search history
// Handles DELETE requests to /history/:id
// :id is a placeholder for the ID of the search history item to be removed
router.delete("/history/:id", removeItemFromSearchHistory);

export default router;
