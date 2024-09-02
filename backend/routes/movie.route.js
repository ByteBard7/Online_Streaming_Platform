import express from "express";
import {
  getTrendingMovie,
  getMovieTrailers,
  getMovieDetails,
  getSimilarMovies,
  getMoviesByCategory,
} from "../controllers/movie.controller.js";

const router = express.Router();

// Route to get trending movies
// Handles GET requests to /trending
router.get("/trending", getTrendingMovie);

// Route to get trailers for a specific movie
// Handles GET requests to /:id/trailers
// :id is a placeholder for the movie ID
router.get("/:id/trailers", getMovieTrailers);

// Route to get details for a specific movie
// Handles GET requests to /:id/details
// :id is a placeholder for the movie ID
router.get("/:id/details", getMovieDetails);

// Route to get similar movies to a specific movie
// Handles GET requests to /:id/similar
// :id is a placeholder for the movie ID
router.get("/:id/similar", getSimilarMovies);

// Route to get movies by category
// Handles GET requests to /:category
// :category is a placeholder for the movie category (e.g., popular, top-rated)
router.get("/:category", getMoviesByCategory);

export default router;
