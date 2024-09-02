import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ChevronRight } from "lucide-react";

const AuthScreen = () => {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const handleFormSubmit = (e) => {
    e.preventDefault();
    navigate("/signup?email=" + email);
  };

  return (
    <div className="hero-bg relative">
      {/* Navbar */}
      <header className="max-w-6xl mx-auto flex items-center justify-between p-4 pb-8">
        <img
          src="/company-logo.png"
          alt="company Logo"
          className="w-32 md:w-52"
        />
        <Link to={"/login"} className="text-white bg-blue-600 py-2 px-4 rounded-full hover:border-2 hover:border-white">
          Sign In
        </Link>
      </header>

      {/* Hero section */}
      <div className="flex flex-col items-center justify-center text-center py-40 text-white max-w-6xl mx-auto">
        <h1 className="text-4xl md:text-6xl font-bold mb-4">
          Stream Endless Entertainment Anytime, Anywhere
        </h1>
        <p className="text-lg mb-4">
          Access a world of movies, TV shows, and more with no limits.
        </p>
        <p className="mb-4">
          Get Started Today! Enter your email to set up or renew your membership
          and start watching instantly.
        </p>

        <form
          className="flex flex-col md:flex-row gap-4 w-1/2"
          onSubmit={handleFormSubmit}
        >
          <input
            type="email"
            placeholder="Email address"
            className="p-2 pl-4 flex-1 bg-black/80 border border-gray-700 rounded-full"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <button className="bg-blue-600 text-xl lg:text-2xl px-2 lg:px-6 py-1 md:py-2 rounded-full flex justify-center items-center hover:bg-blue-700 hover:border-2 hover:border-white">
            Get Started
            <ChevronRight className="size-8 md:size-10" />
          </button>
        </form>
      </div>
    </div>
  );
};

export default AuthScreen;
