import axios from "axios";
import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { SMALL_IMG_BASE_URL } from "../utils/constants";
import { Trash } from "lucide-react";
import toast from "react-hot-toast";

function formatDate(dateString) {
  const date = new Date(dateString);
  const monthNames = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  const month = monthNames[date.getUTCMonth()];
  const day = date.getUTCDate();
  const year = date.getUTCFullYear();
  return `${month} ${day}, ${year}`;
}

const SearchHistoryPage = () => {
  const [searchHistory, setSearchHistory] = useState([]);
  const [loading, setLoading] = useState(true); // Loading state to handle the API call
  const [error, setError] = useState(null); // Error state for better error handling

  useEffect(() => {
    const getSearchHistory = async () => {
      try {
        const res = await axios.get(`/api/v1/search/history`);
        setSearchHistory(res.data.content);
      } catch (error) {
        setError("Failed to load search history. Please try again later.");
      } finally {
        setLoading(false);
      }
    };
    getSearchHistory();
  }, []);

  const handleDelete = async (entry) => {
    try {
      await axios.delete(`/api/v1/search/history/${entry.id}`);
      setSearchHistory(searchHistory.filter((item) => item.id !== entry.id));
      toast.success("Search item deleted successfully!");
    } catch (error) {
      toast.error("Failed to delete search item");
    }
  };

  if (loading) {
    return (
      <div className="bg-black min-h-screen text-white flex justify-center items-center">
        <Navbar />
        <div className="max-w-6xl mx-auto px-4 py-8">
          <p className="text-xl">Loading search history...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-black min-h-screen text-white">
        <Navbar />
        <div className="max-w-6xl mx-auto px-4 py-8">
          <h1 className="text-3xl font-bold mb-8">Search History</h1>
          <div className="flex justify-center items-center h-96">
            <p className="text-xl text-red-500">{error}</p>
          </div>
        </div>
      </div>
    );
  }

  if (searchHistory.length === 0) {
    return (
      <div className="bg-black min-h-screen text-white">
        <Navbar />
        <div className="max-w-6xl mx-auto px-4 py-8">
          <h1 className="text-3xl font-bold mb-8">Search History</h1>
          <div className="flex justify-center items-center h-96">
            <p className="text-xl">No search history found</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-black text-white min-h-screen">
      <Navbar />
      <div className="max-w-6xl mx-auto my-6 px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Search History</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {searchHistory.map((entry) => (
            <div
              key={entry.id}
              className="bg-gray-800 p-4 rounded-lg flex items-start hover:border-2 hover:border-blue-700 transition duration-300"
            >
              <img
                src={`${SMALL_IMG_BASE_URL}${entry.image}`}
                alt={`${entry.title} Thumbnail`}
                className="w-32 h-32 object-contain mr-4"
              />
              <div className="flex flex-col flex-1">
                <span className="text-white text-lg font-semibold">
                  {entry.title}
                </span>
                <span className="text-gray-400 text-sm">
                  {formatDate(entry.createdAt)}
                </span>
              </div>
              <span
                className={`py-1 px-3 text-center rounded-full text-sm ml-auto ${
                  entry.searchType === "movie"
                    ? "bg-red-600"
                    : entry.searchType === "tv"
                    ? "bg-orange-600"
                    : "bg-yellow-600"
                }`}
              >
                {entry.searchType[0].toUpperCase() + entry.searchType.slice(1)}
              </span>
              <Trash
                className="w-5 h-5 ml-4 cursor-pointer fill-red-700 hover:text-blue-500"
                onClick={() => handleDelete(entry)}
                role="button"
                aria-label="Delete search history item"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SearchHistoryPage;
