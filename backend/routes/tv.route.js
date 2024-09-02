import express from "express";
import {
  getTrendingTv,
  getTvTrailers,
  getTvDetails,
  getSimilarTvs,
  getTvsByCategory,
} from "../controllers/tv.controller.js";

const router = express.Router();

// Route to get trending TV shows
// Handles GET requests to /trending
router.get("/trending", getTrendingTv);

// Route to get trailers for a specific TV show
// Handles GET requests to /:id/trailers
// :id is a placeholder for the TV show ID
router.get("/:id/trailers", getTvTrailers);

// Route to get details for a specific TV show
// Handles GET requests to /:id/details
// :id is a placeholder for the TV show ID
router.get("/:id/details", getTvDetails);

// Route to get similar TV shows to a specific TV show
// Handles GET requests to /:id/similar
// :id is a placeholder for the TV show ID
router.get("/:id/similar", getSimilarTvs);

// Route to get TV shows by category
// Handles GET requests to /:category
// :category is a placeholder for the TV show category (e.g., popular, top-rated)
router.get("/:category", getTvsByCategory);

export default router;
