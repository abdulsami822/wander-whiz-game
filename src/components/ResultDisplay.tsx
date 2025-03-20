import React, { useEffect, useState } from "react";
import { useGameContext } from "@/contexts/GameContext";
import { Button } from "@/components/ui/button";
import { Check, X, Globe, ArrowRight } from "lucide-react";
import confetti from "canvas-confetti";
import { motion, AnimatePresence } from "framer-motion";

const ResultDisplay: React.FC = () => {
  const { state, nextDestination } = useGameContext();
  const { currentDestination, hasGuessed, isCorrect } = state;
  const [fadeIn, setFadeIn] = useState(false);

  useEffect(() => {
    if (hasGuessed) {
      // Immediately start fade-in for better responsiveness
      setFadeIn(true);

      // Only show confetti for correct answers
      if (isCorrect) {
        // More subtle confetti configuration
        const subtleConfettiConfig = {
          particleCount: 30, // Even fewer particles
          spread: 50, // Less spread
          disableForReducedMotion: true,
          gravity: 1.5, // Faster fall
          scalar: 0.7, // Smaller particles
          ticks: 100, // Shorter animation duration
          colors: ["#9c5de4", "#f15bb5", "#fee440"],
          zIndex: 9999,
          decay: 0.94, // Faster decay
          startVelocity: 20, // Lower initial velocity
        };

        // Fire confetti from center-top for a more subtle effect
        confetti({
          ...subtleConfettiConfig,
          origin: { x: 0.5, y: 0.3 },
        });
      }
    }

    return () => {
      confetti.reset();
    };
  }, [hasGuessed, isCorrect]);

  if (!currentDestination || !hasGuessed) return null;

  const fact = isCorrect
    ? currentDestination.funFacts[0]
    : currentDestination.trivia[0];

  return (
    <div className="p-4 max-h-[70vh] overflow-y-auto">
      <AnimatePresence>
        {/* Success or failure animation - enhanced */}
        <motion.div
          className="flex justify-center mb-3"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{
            type: "spring",
            stiffness: 300,
            damping: 15,
          }}
        >
          {isCorrect ? (
            <div
              className="w-14 h-14 bg-gradient-to-br from-green-400 to-green-600 rounded-full 
              flex items-center justify-center shadow-md shadow-green-400/20 relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-white opacity-0 animate-pulse-subtle"></div>
              <Check className="w-7 h-7 text-white" />
            </div>
          ) : (
            <div
              className="w-14 h-14 bg-gradient-to-br from-red-400 to-red-600 rounded-full 
              flex items-center justify-center shadow-md shadow-red-400/20"
            >
              <X className="w-7 h-7 text-white" />
            </div>
          )}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.4,
            delay: 0.2,
            ease: [0.22, 1, 0.36, 1],
          }}
          className={`bg-purple-500/5 backdrop-blur-sm rounded-xl p-4 border border-purple-500/20 shadow-md
          transition-all duration-300 ${fadeIn ? "opacity-100" : "opacity-0"}`}
        >
          <motion.h3
            className="text-lg font-bold mb-2 flex items-center gap-2"
            initial={{ opacity: 0, x: -5 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: 0.3 }}
          >
            {isCorrect ? (
              <>
                <span className="bg-green-500/20 text-green-400 p-1 rounded">
                  <Check className="w-4 h-4" />
                </span>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-green-500">
                  Amazing! You got it right!
                </span>
              </>
            ) : (
              <>
                <span className="bg-red-500/20 text-red-400 p-1 rounded">
                  <X className="w-4 h-4" />
                </span>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-400 to-red-500">
                  Not quite right this time
                </span>
              </>
            )}
          </motion.h3>

          <motion.p
            className="mb-3 text-sm leading-relaxed text-gray-300"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3, delay: 0.4 }}
          >
            {isCorrect
              ? `Excellent job! You've correctly identified ${currentDestination.city}, ${currentDestination.country}.`
              : `The correct answer was ${currentDestination.city}, ${currentDestination.country}.`}
          </motion.p>

          <motion.div
            className="flex flex-col md:flex-row gap-3 mb-3"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.5 }}
          >
            <div className="flex-1 bg-purple-500/10 rounded-lg p-3 backdrop-blur-sm border border-purple-500/10 shadow-inner">
              <div className="flex items-center gap-2 mb-1">
                <Globe className="w-4 h-4 text-purple-400" />
                <h4 className="font-semibold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500">
                  Fun Fact:
                </h4>
              </div>
              <p className="italic text-sm leading-relaxed text-gray-300">
                {fact}
              </p>
            </div>

            {currentDestination.image && (
              <div className="flex-1 overflow-hidden rounded-lg border border-purple-500/10 shadow-md">
                <div className="relative h-full">
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                  <DestinationImage currentDestination={currentDestination} />

                  <div className="absolute bottom-2 left-2 bg-black/50 backdrop-blur-sm text-white px-2 py-1 rounded-full text-xs">
                    {currentDestination.city}, {currentDestination.country}
                  </div>
                </div>
              </div>
            )}
          </motion.div>

          <motion.div
            className="text-center mt-3"
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.6 }}
          >
            <Button
              onClick={nextDestination}
              className="px-4 py-2 h-auto text-base font-medium bg-gradient-to-r from-purple-500 to-pink-500 
                hover:from-purple-600 hover:to-pink-600 hover:shadow-md transition-all duration-200 group"
            >
              Next Destination
              <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" />
            </Button>
          </motion.div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

const DestinationImage = ({ currentDestination }) => {
  // Add image fallback and loading states
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);
  return (
    <div className="relative">
      {currentDestination.image && !imageError ? (
        <img
          src={currentDestination.image}
          alt={currentDestination.city}
          onLoad={() => setImageLoaded(true)}
          onError={() => setImageError(true)}
          className={`w-full h-28 object-cover rounded-lg transition-opacity duration-300 ${
            imageLoaded ? "opacity-100" : "opacity-0"
          }`}
        />
      ) : (
        <div className="w-full h-28 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-lg flex items-center justify-center">
          <Globe className="w-12 h-12 text-purple-400/50" />
        </div>
      )}
    </div>
  );
};

export default ResultDisplay;
