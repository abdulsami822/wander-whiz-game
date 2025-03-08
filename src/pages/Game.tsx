import React, { useEffect } from "react";
import { useGameContext } from "@/contexts/GameContext";
import GameCard from "@/components/GameCard";
import ClueDisplay from "@/components/ClueDisplay";
import AnswerOptions from "@/components/AnswerOptions";
import ResultDisplay from "@/components/ResultDisplay";
import ScoreDisplay from "@/components/ScoreDisplay";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Home, RefreshCw, Globe, MapPin, Compass, Award } from "lucide-react";
import { motion } from "framer-motion";

const Game = () => {
  const { state, resetGame } = useGameContext();
  const { currentDestination, hasGuessed, gameOver, score } = state;

  useEffect(() => {
    // Make sure we have a game in progress
    if (!currentDestination && !gameOver) {
      resetGame();
    }
  }, [currentDestination, gameOver, resetGame]);

  if (gameOver) {
    return (
      <div className="min-h-screen flex items-center justify-center p-6 bg-gradient-to-b from-[#2a2b36] to-[#1a1b26] overflow-hidden relative">
        <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]"></div>
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -inset-[10px] opacity-30">
            {Array.from({ length: 20 }).map((_, i) => (
              <div
                key={i}
                className="absolute rounded-full bg-purple-500/20"
                style={{
                  width: `${Math.random() * 300 + 50}px`,
                  height: `${Math.random() * 300 + 50}px`,
                  top: `${Math.random() * 100}%`,
                  left: `${Math.random() * 100}%`,
                  animationDuration: `${Math.random() * 10 + 10}s`,
                  animationDelay: `${Math.random() * 5}s`,
                }}
              ></div>
            ))}
          </div>
        </div>

        <div className="relative z-10 max-w-2xl w-full">
          <GameCard
            title="Journey Complete!"
            className="max-w-lg mx-auto animate-scale-in border-2 border-purple-500/20 bg-[#1a1b26]/80 backdrop-blur-sm"
          >
            <div className="text-center py-8 space-y-8">
              <div className="w-24 h-24 mx-auto bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                <Award className="w-12 h-12 text-white" />
              </div>

              <div>
                <h2 className="text-5xl font-bold mb-2 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-500 to-red-500">
                  Final Score: {score}
                </h2>
                <p className="text-xl text-gray-400">
                  Congratulations! You've completed your journey around the
                  world.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4 max-w-xs mx-auto">
                <div className="bg-purple-500/10 p-4 rounded-lg">
                  <div className="text-purple-400 text-2xl font-bold">10</div>
                  <div className="text-gray-400 text-sm">Destinations</div>
                </div>
                <div className="bg-pink-500/10 p-4 rounded-lg">
                  <div className="text-pink-400 text-2xl font-bold">Expert</div>
                  <div className="text-gray-400 text-sm">Traveler Rank</div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
                <Button
                  onClick={resetGame}
                  className="group px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 transition-all duration-300 hover:scale-105 hover:shadow-[0_0_15px_rgba(168,85,247,0.5)]"
                >
                  <RefreshCw className="w-4 h-4 mr-2" />
                  New Journey
                </Button>
                <Link to="/">
                  <Button
                    variant="outline"
                    className="px-6 py-3 border-2 border-purple-500/50 hover:border-purple-500 hover:bg-purple-500/10 transition-all duration-300 hover:scale-105"
                  >
                    <Home className="w-4 h-4 mr-2" />
                    Return Home
                  </Button>
                </Link>
              </div>
            </div>
          </GameCard>
        </div>
      </div>
    );
  }

  if (!currentDestination) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-[#2a2b36] to-[#1a1b26]">
        <div className="text-center space-y-4">
          <Globe className="w-16 h-16 mx-auto text-purple-400 animate-pulse" />
          <p className="text-xl text-gray-400">
            Preparing your next destination...
          </p>
          <div className="flex justify-center space-x-2 mt-4">
            <div
              className="w-3 h-3 rounded-full bg-purple-500 animate-bounce"
              style={{ animationDelay: "0ms" }}
            ></div>
            <div
              className="w-3 h-3 rounded-full bg-pink-500 animate-bounce"
              style={{ animationDelay: "150ms" }}
            ></div>
            <div
              className="w-3 h-3 rounded-full bg-red-500 animate-bounce"
              style={{ animationDelay: "300ms" }}
            ></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-[#2a2b36] to-[#1a1b26] relative">
      <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]"></div>

      <header className="relative z-10 container max-w-4xl mx-auto pt-6 px-6">
        <div className="bg-purple-500/10 rounded-xl border border-purple-500/20 overflow-hidden">
          <ScoreDisplay />
        </div>
      </header>

      <main className="flex-grow container max-w-4xl mx-auto p-6 flex flex-col items-center justify-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: -5 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="w-full max-w-2xl mb-4 flex items-center justify-center"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-500/10 border border-purple-500/20">
            <Compass className="w-4 h-4 text-purple-400" />
            <span className="text-sm text-purple-400">
              Destination Challenge
            </span>
          </div>
        </motion.div>

        <GameCard className="w-full max-w-2xl border-2 border-purple-500/20 bg-[#1a1b26]/80 backdrop-blur-sm overflow-visible min-h-[380px] flex flex-col">
          <div className="absolute top-4 right-4 z-10">
            <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20">
              <MapPin className="w-3 h-3 text-purple-400" />
              <span className="text-xs text-purple-400">Mystery Location</span>
            </div>
          </div>

          <div className="flex-grow flex flex-col justify-center">
            {hasGuessed ? (
              <ResultDisplay />
            ) : (
              <div className="space-y-6 p-6">
                <ClueDisplay />
                <AnswerOptions />
              </div>
            )}
          </div>
        </GameCard>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
          className="mt-6 text-center text-gray-500 text-sm"
        >
          <p>Use the clues to identify the mystery destination</p>
        </motion.div>
      </main>
    </div>
  );
};

export default Game;
