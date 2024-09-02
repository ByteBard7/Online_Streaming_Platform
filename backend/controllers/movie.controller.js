import { fetchFromTMDB } from "../services/tmdb.services.js";

// Helper function to build TMDB URLs
const buildTMDBUrl = (endpoint) =>
  `https://api.themoviedb.org/3${endpoint}?language=en-US`;

// Helper function to handle TMDB API requests
const handleTMDBRequest = async (url) => {
  try {
    const data = await fetchFromTMDB(url);
    return { success: true, data };
  } catch (error) {
    if (error.message.includes("404")) {
      return { success: false, status: 404, data: null };
    }
    return { success: false, status: 500, message: "Internal Server Error" };
  }
};

export async function getTrendingMovie(req, res) {
  const url = buildTMDBUrl("/trending/movie/day");
  const { success, data, status, message } = await handleTMDBRequest(url);

  if (success) {
    const randomMovie =
      data.results[Math.floor(Math.random() * data.results.length)];
    return res.json({ success: true, content: randomMovie });
  }

  res.status(status).json({ success, message });
}

export async function getMovieTrailers(req, res) {
  const { id } = req.params;
  const url = buildTMDBUrl(`/movie/${id}/videos`);
  const { success, data, status, message } = await handleTMDBRequest(url);

  if (success) {
    return res.json({ success: true, trailers: data.results });
  }

  res.status(status).send(null);
}

export async function getMovieDetails(req, res) {
  const { id } = req.params;
  const url = buildTMDBUrl(`/movie/${id}`);
  const { success, data, status, message } = await handleTMDBRequest(url);

  if (success) {
    return res.status(200).json({ success: true, content: data });
  }

  res.status(status).send(null);
}

export async function getSimilarMovies(req, res) {
  const { id } = req.params;
  const url = buildTMDBUrl(`/movie/${id}/similar?page=1`);
  const { success, data, status, message } = await handleTMDBRequest(url);

  if (success) {
    return res.status(200).json({ success: true, similar: data.results });
  }

  res.status(status).json({ success, message });
}

export async function getMoviesByCategory(req, res) {
  const { category } = req.params;
  const url = buildTMDBUrl(`/movie/${category}`);
  const { success, data, status, message } = await handleTMDBRequest(url);

  if (success) {
    return res.status(200).json({ success: true, content: data.results });
  }

  res.status(status).json({ success, message });
}
