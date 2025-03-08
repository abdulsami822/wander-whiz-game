import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import React from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Home, Map } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-gradient-to-b from-[#2a2b36] to-[#1a1b26] overflow-hidden relative">
      <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]"></div>

      <div className="relative z-10 max-w-md w-full text-center">
        <div className="relative mb-8">
          <div className="absolute inset-0 blur-xl bg-gradient-to-r from-purple-500/30 to-pink-500/30 rounded-full transform -translate-y-1/2"></div>
          <Map className="w-24 h-24 mx-auto text-purple-400 relative" />
        </div>

        <h1 className="text-6xl font-bold mb-2 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-500 to-red-500">
          404
        </h1>

        <h2 className="text-2xl font-semibold mb-4 text-white">
          Destination Not Found
        </h2>

        <p className="text-gray-400 mb-8">
          Oops! It seems you've wandered off the map. The destination you're
          looking for doesn't exist or has been moved.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link to="/">
            <Button className="w-full sm:w-auto group px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 transition-all duration-300 hover:scale-105 hover:shadow-[0_0_15px_rgba(168,85,247,0.5)]">
              <Home className="w-4 h-4 mr-2" />
              Return Home
            </Button>
          </Link>

          <Link to="/game">
            <Button
              variant="outline"
              className="w-full sm:w-auto px-6 py-3 border-2 border-purple-500/50 hover:border-purple-500 hover:bg-purple-500/10 transition-all duration-300 hover:scale-105"
            >
              <Map className="w-4 h-4 mr-2" />
              Start New Journey
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
