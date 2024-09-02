import { User } from "../models/user.model.js";
import { fetchFromTMDB } from "../services/tmdb.services.js";

// Helper function to build TMDB search URLs
const buildSearchUrl = (type, query) =>
  `https://api.themoviedb.org/3/search/${type}?query=${query}&include_adult=false&language=en-US&page=1`;

// Helper function to update user search history
const updateSearchHistory = async (userId, result, type) => {
  await User.findByIdAndUpdate(userId, {
    $push: {
      searchHistory: {
        id: result.id,
        image: result.poster_path || result.profile_path,
        title: result.title || result.name,
        searchType: type,
        createdAt: new Date(),
      },
    },
  });
};

// Generic search function
const searchAndRespond = async (req, res, type) => {
  const { query } = req.params;

  try {
    const response = await fetchFromTMDB(buildSearchUrl(type, query));

    if (response.results.length === 0) {
      return res.status(404).send(null);
    }

    await updateSearchHistory(req.user._id, response.results[0], type);

    res.status(200).json({ success: true, content: response.results });
  } catch (error) {
    console.log(
      `Error in search${
        type.charAt(0).toUpperCase() + type.slice(1)
      } controller: `,
      error.message
    );
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

export async function searchPerson(req, res) {
  await searchAndRespond(req, res, "person");
}

export async function searchMovie(req, res) {
  await searchAndRespond(req, res, "movie");
}

export async function searchTv(req, res) {
  await searchAndRespond(req, res, "tv");
}

export async function getSearchHistory(req, res) {
  try {
    res.status(200).json({ success: true, content: req.user.searchHistory });
  } catch (error) {
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
}

export async function removeItemFromSearchHistory(req, res) {
  let { id } = req.params;

  id = parseInt(id);

  try {
    await User.findByIdAndUpdate(req.user._id, {
      $pull: {
        searchHistory: { id: id },
      },
    });

    res
      .status(200)
      .json({ success: true, message: "Item removed from search history" });
  } catch (error) {
    console.log(
      "Error in removeItemFromSearchHistory controller: ",
      error.message
    );
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
}
