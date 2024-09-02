import { fetchFromTMDB } from "../services/tmdb.services.js";

// Fetches trending TV shows of the day and returns a random show
export async function getTrendingTv(req, res) {
  try {
    // Fetch trending TV shows from TMDB API
    const data = await fetchFromTMDB(
      "https://api.themoviedb.org/3/trending/tv/day?language=en-US"
    );
    // Select a random TV show from the results
    const randomShow =
      data.results[Math.floor(Math.random() * data.results?.length)];

    // Send the random TV show in the response
    res.json({ success: true, content: randomShow });
  } catch (error) {
    // Handle errors by sending a 500 status with an error message
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
}

// Fetches trailers for a specific TV show by its ID
export async function getTvTrailers(req, res) {
  const { id } = req.params;
  try {
    // Fetch TV show trailers from TMDB API
    const data = await fetchFromTMDB(
      `https://api.themoviedb.org/3/tv/${id}/videos?language=en-US`
    );
    // Send the trailers in the response
    res.json({ success: true, trailers: data.results });
  } catch (error) {
    // Handle 404 errors by returning a 404 status with null
    if (error.message.includes("404")) {
      return res.status(404).send(null);
    }
    // Handle other errors by sending a 500 status with an error message
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
}

// Fetches detailed information about a specific TV show by its ID
export async function getTvDetails(req, res) {
  const { id } = req.params;
  try {
    // Fetch TV show details from TMDB API
    const data = await fetchFromTMDB(
      `https://api.themoviedb.org/3/tv/${id}?language=en-US`
    );
    // Send the TV show details in the response
    res.status(200).json({ success: true, content: data });
  } catch (error) {
    // Handle 404 errors by returning a 404 status with null
    if (error.message.includes("404")) {
      return res.status(404).send(null);
    }
    // Handle other errors by sending a 500 status with an error message
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
}

// Fetches TV shows similar to a specific TV show by its ID
export async function getSimilarTvs(req, res) {
  const { id } = req.params;
  try {
    // Fetch similar TV shows from TMDB API
    const data = await fetchFromTMDB(
      `https://api.themoviedb.org/3/tv/${id}/similar?language=en-US&page=1`
    );
    // Send the similar TV shows in the response
    res.status(200).json({ success: true, similar: data.results });
  } catch (error) {
    // Handle errors by sending a 500 status with an error message
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
}

// Fetches TV shows by category from TMDB API
export async function getTvsByCategory(req, res) {
  const { category } = req.params;
  try {
    // Fetch TV shows by category from TMDB API
    const data = await fetchFromTMDB(
      `https://api.themoviedb.org/3/tv/${category}?language=en-US&page=1`
    );
    // Send the TV shows in the response
    res.status(200).json({ success: true, content: data.results });
  } catch (error) {
    // Handle errors by sending a 500 status with an error message
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
}
