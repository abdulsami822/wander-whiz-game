import React, { useEffect, useState } from "react";
import { useGameContext } from "@/contexts/GameContext";
import GameCard from "@/components/GameCard";
import ClueDisplay from "@/components/ClueDisplay";
import AnswerOptions from "@/components/AnswerOptions";
import ResultDisplay from "@/components/ResultDisplay";
import ScoreDisplay from "@/components/ScoreDisplay";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import {
  Home,
  RefreshCw,
  Globe,
  MapPin,
  Compass,
  Award,
  Users,
  Trophy,
} from "lucide-react";
import { motion } from "framer-motion";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";

const Game = () => {
  const { state, resetGame, openChallengeDialog, fetchDestinations } =
    useGameContext();
  const {
    currentDestination,
    hasGuessed,
    gameOver,
    score,
    challengeUsername,
    challengeScore,
  } = state;

  // State for the welcome challenge modal
  const [showChallengeModal, setShowChallengeModal] = useState(false);

  // Fetch destinations when the Game component mounts
  useEffect(() => {
    fetchDestinations();
  }, [fetchDestinations]);

  useEffect(() => {
    // Show challenge modal when challenge parameters are present and game is starting

    if (challengeUsername && challengeScore && !gameOver) {
      setShowChallengeModal(true);
    }
  }, [challengeUsername, challengeScore, gameOver]);

  useEffect(() => {
    // Make sure we have a game in progress
    if (!currentDestination && !gameOver) {
      // Add a check to prevent infinite resets
      if (state.loading === false && state.destinations.length > 0) {
        resetGame();
      }
    }
  }, [
    currentDestination,
    gameOver,
    resetGame,
    state.loading,
    state.destinations.length,
  ]);
  // Create a handler function that calls resetGame without passing the event
  const handleResetGame = async () => {
    // Reset the game and clear any challenge data
    await resetGame({ clearChallenge: true });

    // Clear URL parameters by replacing the current URL with the base path
    window.history.replaceState({}, document.title, window.location.pathname);
  };
  // Challenge welcome modal
  const ChallengeWelcomeModal = () => (
    <Dialog open={showChallengeModal} onOpenChange={setShowChallengeModal}>
      <DialogContent className="sm:max-w-md bg-gradient-to-b from-[#2a2b36] to-[#1a1b26] border-2 border-purple-500/30">
        <DialogHeader>
          <DialogTitle className="text-2xl text-center">
            Challenge Accepted!
          </DialogTitle>
          <DialogDescription className="text-center text-gray-300">
            Get ready to beat {challengeUsername}'s score!
          </DialogDescription>
        </DialogHeader>

        <div className="p-6 bg-gradient-to-br from-purple-900/40 to-indigo-900/40 rounded-lg text-white text-center my-4 border border-purple-500/30">
          <Trophy className="w-12 h-12 mx-auto text-yellow-400 mb-2" />
          <h3 className="text-xl font-bold mb-2">WanderWhiz Challenge</h3>
          <p className="text-lg mb-2">{challengeUsername} scored</p>
          <div className="text-4xl font-bold mb-2 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-500 to-red-500">
            {challengeScore}
          </div>
          <p className="text-sm">Can you beat this score?</p>
        </div>

        <DialogFooter>
          <Button
            onClick={() => setShowChallengeModal(false)}
            className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
          >
            Let's Go!
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );

  if (gameOver) {
    return (
      <GameOver
        score={score}
        challengeScore={challengeScore}
        challengeUsername={challengeUsername}
        handleResetGame={handleResetGame}
        openChallengeDialog={openChallengeDialog}
      />
    );
  }

  if (!currentDestination) {
    return <GameLoader />;
  }

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-[#2a2b36] to-[#1a1b26] relative overflow-hidden">
      {/* Fun animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Animated grid background */}
        <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]"></div>

        {/* Floating map pins */}
        {Array.from({ length: 8 }).map((_, i) => (
          <div
            key={`pin-${i}`}
            className="absolute animate-float"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 10}s`,
              animationDuration: `${15 + Math.random() * 20}s`,
              opacity: 0.2,
              transform: `scale(${0.5 + Math.random() * 0.5})`,
            }}
          >
            <MapPin className="w-8 h-8 text-purple-400" />
          </div>
        ))}

        {/* Glowing orbs */}
        {Array.from({ length: 12 }).map((_, i) => (
          <div
            key={`orb-${i}`}
            className="absolute rounded-full animate-pulse-slow"
            style={{
              width: `${Math.random() * 150 + 50}px`,
              height: `${Math.random() * 150 + 50}px`,
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              background: `radial-gradient(circle, rgba(${
                Math.floor(Math.random() * 100) + 100
              }, ${Math.floor(Math.random() * 50) + 50}, ${
                Math.floor(Math.random() * 200) + 55
              }, 0.15), transparent)`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${5 + Math.random() * 7}s`,
            }}
          ></div>
        ))}

        {/* Compass elements */}
        <div className="absolute top-[10%] right-[5%] opacity-10 rotate-12 animate-spin-slow">
          <Compass className="w-32 h-32 text-indigo-300" />
        </div>
        <div className="absolute bottom-[15%] left-[8%] opacity-10 -rotate-12 animate-spin-slow-reverse">
          <Compass className="w-24 h-24 text-purple-300" />
        </div>

        {/* Subtle particle effect */}
        <div className="absolute inset-0">
          {Array.from({ length: 30 }).map((_, i) => (
            <div
              key={`particle-${i}`}
              className="absolute rounded-full bg-white animate-float-particle"
              style={{
                width: `${Math.random() * 3 + 1}px`,
                height: `${Math.random() * 3 + 1}px`,
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                opacity: Math.random() * 0.3 + 0.1,
                animationDelay: `${Math.random() * 5}s`,
                animationDuration: `${10 + Math.random() * 20}s`,
              }}
            ></div>
          ))}
        </div>
      </div>

      {/* Challenge welcome modal */}
      <ChallengeWelcomeModal />

      <header className="relative z-10 container max-w-4xl mx-auto pt-6 px-6">
        <div className="bg-purple-500/10 rounded-xl border border-purple-500/20 overflow-hidden">
          <ScoreDisplay />
        </div>

        {/* Enhanced challenge info banner */}
        {challengeUsername && challengeScore && (
          <div className="mt-4 p-4 bg-gradient-to-r from-purple-900/30 to-indigo-900/30 border border-purple-500/30 rounded-lg flex items-center justify-between backdrop-blur-sm">
            <div className="flex items-center gap-3">
              <Trophy className="h-8 w-8 text-yellow-400" />
              <div>
                <p className="text-sm text-purple-300">
                  Challenge from{" "}
                  <span className="font-bold">{challengeUsername}</span>
                </p>
                <p className="text-xs text-gray-400">
                  Score to beat:{" "}
                  <span className="font-bold text-pink-400">
                    {challengeScore}
                  </span>{" "}
                  points
                </p>
              </div>
            </div>
            <div className="text-xs px-3 py-1 rounded-full bg-purple-500/20 border border-purple-500/30">
              {score > challengeScore ? "Winning! 🏆" : "Keep going! 💪"}
            </div>
          </div>
        )}
      </header>

      <main className="flex-grow container max-w-4xl mx-auto p-6 flex flex-col items-center justify-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: -5 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="w-full max-w-2xl mb-4 flex items-center justify-between"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-500/10 border border-purple-500/20 backdrop-blur-sm">
            <Compass className="w-4 h-4 text-purple-400" />
            <span className="text-sm text-purple-400">
              Destination Challenge
            </span>
          </div>

          {/* Challenge a Friend button in the game UI */}
        </motion.div>

        <GameCard className="w-full max-w-2xl border-2 border-purple-500/20 bg-[#1a1b26]/80 backdrop-blur-sm overflow-visible min-h-[380px] flex flex-col shadow-[0_0_15px_rgba(149,76,233,0.15)]">
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

const GameOver: React.FC<{
  score: number;
  challengeUsername?: string;
  challengeScore?: number;
  handleResetGame: () => void;
  openChallengeDialog: () => void;
}> = ({
  score,
  challengeScore,
  challengeUsername,
  handleResetGame,
  openChallengeDialog,
}) => {
  return (
    <div className="min-h-screen flex items-center justify-center p-4 sm:p-6 bg-gradient-to-b from-[#2a2b36] to-[#1a1b26] relative">
      <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]"></div>
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -inset-[10px] opacity-30">
          {Array.from({ length: 6 }).map((_, i) => (
            <div
              key={i}
              className="absolute rounded-full bg-purple-500/20"
              style={{
                width: `${Math.random() * 150 + 50}px`,
                height: `${Math.random() * 150 + 50}px`,
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
              }}
            ></div>
          ))}
        </div>
      </div>

      <div className="relative z-10 w-full max-w-lg">
        <GameCard
          title="Journey Complete!"
          className="mx-auto animate-scale-in border border-purple-500/20 bg-[#1a1b26]/90 backdrop-blur-sm"
        >
          <div className="text-center p-6 space-y-5">
            {/* Award badge */}
            <div className="relative">
              <div className="w-20 h-20 mx-auto bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center shadow-md">
                <Award className="w-10 h-10 text-white" />
              </div>
            </div>

            {/* Score display */}
            <div>
              <h2 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 mb-2">
                Score: {score}
              </h2>
              <p className="text-sm text-gray-300">Journey completed!</p>
            </div>

            {/* Stats cards in horizontal layout */}
            <div className="flex gap-4 justify-center">
              <div className="flex-1 bg-gradient-to-br from-purple-500/10 to-purple-500/5 p-3 rounded-lg border border-purple-500/20">
                <div className="text-purple-400 text-2xl font-bold">10</div>
                <div className="text-gray-400 text-sm">Destinations</div>
              </div>
              <div className="flex-1 bg-gradient-to-br from-pink-500/10 to-pink-500/5 p-3 rounded-lg border border-pink-500/20">
                <div className="text-pink-400 text-2xl font-bold">Expert</div>
                <div className="text-gray-400 text-sm">Traveler Rank</div>
              </div>
            </div>

            {/* Challenge info display - improved */}
            {challengeUsername && challengeScore && (
              <div className="bg-gradient-to-r from-purple-900/20 to-indigo-900/20 p-4 rounded-lg border border-purple-500/30">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center">
                    <Trophy className="w-5 h-5 text-yellow-400 mr-2" />
                    <h3 className="text-base font-bold text-purple-400">
                      Challenge Results
                    </h3>
                  </div>

                  {score > challengeScore ? (
                    <span className="text-sm font-bold text-green-400 px-3 py-1 bg-green-500/20 rounded-full border border-green-500/30">
                      Victory! 🏆
                    </span>
                  ) : score === challengeScore ? (
                    <span className="text-sm font-bold text-yellow-400 px-3 py-1 bg-yellow-500/20 rounded-full border border-yellow-500/30">
                      Tie 🤝
                    </span>
                  ) : (
                    <span className="text-sm font-bold text-red-400 px-3 py-1 bg-red-500/20 rounded-full border border-red-500/30">
                      Try Again 💪
                    </span>
                  )}
                </div>

                <div className="flex items-center justify-between text-sm border-t border-purple-500/20 pt-3 mt-2">
                  <div>
                    <span className="text-gray-400">Challenger:</span>
                    <div className="font-bold text-purple-400">
                      {challengeUsername}
                    </div>
                    <div className="text-pink-400 font-bold">
                      {challengeScore} pts
                    </div>
                  </div>

                  <div className="text-center text-gray-400 text-xl font-bold">
                    vs
                  </div>

                  <div className="text-right">
                    <span className="text-gray-400">You:</span>
                    <div className="font-bold text-purple-400">Your Score</div>
                    <div className="text-pink-400 font-bold">{score} pts</div>
                  </div>
                </div>
              </div>
            )}

            {/* Buttons in a better layout */}
            <div className="flex flex-col sm:flex-row gap-3 pt-3">
              <Button
                onClick={handleResetGame}
                className="w-full sm:flex-1 group px-3 py-2 h-auto text-sm font-medium bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
              >
                <RefreshCw className="w-4 h-4 mr-2 group-hover:rotate-180 transition-transform" />
                New Journey
              </Button>

              {score > 0 && (
                <Button
                  onClick={openChallengeDialog}
                  className="w-full sm:flex-1 group px-3 py-2 h-auto text-sm font-medium bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600"
                >
                  <Users className="w-4 h-4 mr-2" />
                  Challenge
                </Button>
              )}

              <Link to="/" className="w-full sm:flex-1">
                <Button
                  variant="outline"
                  className="w-full px-3 py-2 h-auto text-sm font-medium border border-purple-500/50 hover:bg-purple-500/10"
                  onClick={handleResetGame}
                >
                  <Home className="w-4 h-4 mr-2" />
                  Home
                </Button>
              </Link>
            </div>
          </div>
        </GameCard>
      </div>
    </div>
  );
};

const GameLoader = () => {
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
};

export default Game;
