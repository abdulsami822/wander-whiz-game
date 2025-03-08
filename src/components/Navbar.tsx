import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Home, RefreshCw, PlayCircle, Info } from "lucide-react";
import { useGameContext } from "@/contexts/GameContext";

const Navbar = () => {
  const location = useLocation();
  const { resetGame } = useGameContext();
  const isGamePage = location.pathname === "/game";

  const navigationLinks = [
    {
      to: "/game",
      label: "Play Game",
      icon: <PlayCircle className="w-4 h-4" />,
      showOn: ["/", "/about"],
    },
    {
      to: "/about",
      label: "About",
      icon: <Info className="w-4 h-4" />,
      showOn: ["/", "/game"],
    },
    {
      to: "/",
      label: "Home",
      icon: <Home className="w-4 h-4" />,
      showOn: ["/game", "/about"],
    },
  ];

  return (
    <header className="border-b border-purple-500/20 bg-game-background/80 backdrop-blur-sm sticky top-0 z-10 shadow-lg">
      <div className="container max-w-6xl mx-auto p-4 flex justify-between items-center">
        <Link
          to="/"
          className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500 hover:opacity-80 transition-all duration-300"
        >
          Globetrotter
        </Link>
        <div className="flex gap-2">
          {isGamePage ? (
            <>
              <Button
                variant="ghost"
                size="sm"
                onClick={resetGame}
                className="flex items-center gap-1 text-purple-400 hover:text-purple-300 hover:bg-purple-500/10"
              >
                <RefreshCw className="w-4 h-4" />
                Reset
              </Button>
              <Link to="/">
                <Button
                  variant="ghost"
                  size="sm"
                  className="flex items-center gap-1 text-purple-400 hover:text-purple-300 hover:bg-purple-500/10"
                >
                  <Home className="w-4 h-4" />
                  Home
                </Button>
              </Link>
            </>
          ) : (
            <>
              {navigationLinks
                .filter((link) => link.showOn.includes(location.pathname))
                .map((link) => (
                  <Link key={link.to} to={link.to}>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="flex items-center gap-1 text-purple-400 hover:text-purple-300 hover:bg-purple-500/10 transition-all duration-300"
                    >
                      {link.icon}
                      {link.label}
                    </Button>
                  </Link>
                ))}
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;
