import axios from "axios";
import { ENV_VARS } from "../config/envVars.js";

/**
 * Fetches data from The Movie Database (TMDB) API.
 * @param {string} url - The URL for the TMDB API endpoint.
 * @returns {Promise<Object>} - The data returned from the TMDB API.
 * @throws {Error} - Throws an error if the response status is not 200.
 */
export const fetchFromTMDB = async (url) => {
  // Set up options for the request, including headers for authorization
  const options = {
    headers: {
      accept: "application/json", // Accepts JSON response
      Authorization: "Bearer " + ENV_VARS.TMDB_API_KEY, // Bearer token for API authentication
    },
  };

  try {
    // Send a GET request to the TMDB API with the provided URL and options
    const response = await axios.get(url, options);

    // Check if the response status is not 200 (OK), throw an error
    if (response.status !== 200) {
      throw new Error("Failed to fetch data from TMDB: " + response.statusText);
    }

    // Return the data from the response
    return response.data;
  } catch (error) {
    // Catch and rethrow any errors that occur during the request
    throw new Error("Error fetching data from TMDB: " + error.message);
  }
};
