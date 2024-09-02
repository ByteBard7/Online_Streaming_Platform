import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ChevronRight } from "lucide-react";

const AuthScreen = () => {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const handleFormSubmit = (e) => {
    e.preventDefault();
    navigate(`/signup?email=${email}`);
  };

  return (
    <div className="hero-bg relative min-h-screen flex flex-col">
      {/* Navbar */}
      <header className="w-full flex items-center justify-around p-6">
        <img
          src="/company-logo.png"
          alt="Company Logo"
          className="w-32 md:w-40"
        />
        <Link
          to="/login"
          className="text-white bg-blue-600 py-2 px-6 rounded-full hover:bg-blue-700 transition-colors duration-300"
          aria-label="Sign In"
        >
          Sign In
        </Link>
      </header>

      {/* Hero Section */}
      <div className="flex flex-1 flex-col items-center justify-center text-center py-20 px-4 text-white max-w-4xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-extrabold mb-6">
          Stream Endless Entertainment Anytime, Anywhere
        </h1>
        <p className="text-lg md:text-xl mb-4">
          Access a world of movies, TV shows, and more with no limits.
        </p>
        <p className="text-md md:text-lg mb-8">
          Get started today! Enter your email to set up or renew your membership
          and start watching instantly.
        </p>

        <form
          className="flex flex-col md:flex-row items-center gap-4 w-full max-w-xl"
          onSubmit={handleFormSubmit}
        >
          <input
            type="email"
            placeholder="Email address"
            className="p-3 flex-1 bg-black/70 border border-gray-600 rounded-full text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-600"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            aria-label="Email address"
          />
          <button
            type="submit"
            className="bg-blue-600 text-lg px-6 py-3 rounded-full flex items-center justify-center hover:bg-blue-700 transition-colors duration-300"
            aria-label="Get Started"
          >
            Get Started
            <ChevronRight className="ml-2 w-5 h-5" />
          </button>
        </form>
      </div>
    </div>
  );
};

export default AuthScreen;
