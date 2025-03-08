import React, { useState, useEffect } from "react";
import { useGameContext } from "@/contexts/GameContext";
import { Button } from "@/components/ui/button";
import { HelpCircle, MapPin } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const ClueDisplay: React.FC = () => {
  const { state, showNextClue } = useGameContext();
  const { currentDestination, clueIndex, hasGuessed } = state;
  const [isLoaded, setIsLoaded] = useState(false);
  const [typingComplete, setTypingComplete] = useState(false);

  useEffect(() => {
    setIsLoaded(false);
    setTypingComplete(false);

    // Stagger the animations for a more natural feel
    const loadTimer = setTimeout(() => {
      setIsLoaded(true);

      // Start typing animation after a short delay
      const typingTimer = setTimeout(() => {
        setTypingComplete(true);
      }, 800); // Time for typing animation to complete

      return () => clearTimeout(typingTimer);
    }, 200);

    return () => clearTimeout(loadTimer);
  }, [clueIndex, currentDestination]);

  if (!currentDestination) return null;

  const currentClue = currentDestination.clues[clueIndex];
  const hasMoreClues = clueIndex < currentDestination.clues.length - 1;

  // Split the clue text for the typing animation
  const clueText = currentClue || "";

  return (
    <div className="space-y-6">
      <AnimatePresence mode="wait">
        <motion.div
          key={clueIndex}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{
            duration: 0.4,
            ease: [0.22, 1, 0.36, 1], // Custom easing for smoother motion
          }}
          className="relative"
        >
          <motion.div
            className="absolute -left-3 top-1/2 transform -translate-y-1/2 z-10"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{
              delay: 0.2,
              duration: 0.5,
              type: "spring",
              stiffness: 200,
            }}
          >
            <div className="bg-gradient-to-r from-purple-500 to-pink-500 p-2 rounded-full shadow-lg">
              <MapPin className="w-5 h-5 text-white" />
            </div>
          </motion.div>

          <motion.div
            className="bg-purple-500/10 rounded-lg p-6 pl-10 shadow-inner border border-purple-500/20 overflow-hidden"
            initial={{ x: -20, opacity: 0.5 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{
              duration: 0.5,
              delay: 0.1,
              ease: "easeOut",
            }}
          >
            <div className="relative overflow-hidden">
              {/* Typing animation overlay */}
              <motion.div
                className="absolute top-0 left-0 h-full bg-gradient-to-r from-transparent via-purple-400/10 to-transparent"
                initial={{ x: "-100%" }}
                animate={{ x: "200%" }}
                transition={{
                  duration: 1.5,
                  ease: "linear",
                  repeat: typingComplete ? 0 : 2,
                }}
              />

              <motion.p
                className="font-medium text-gray-300 leading-relaxed"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.3 }}
              >
                {clueText}
              </motion.p>
            </div>
          </motion.div>
        </motion.div>
      </AnimatePresence>

      {!hasGuessed && hasMoreClues && (
        <motion.div
          className="flex justify-center pt-2"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: isLoaded ? 1 : 0, y: isLoaded ? 0 : 10 }}
          transition={{ duration: 0.4, delay: 0.6 }}
        >
          <Button
            variant="outline"
            onClick={showNextClue}
            className="group hover:bg-purple-500/10 hover:text-purple-400 transition-all
              duration-300 border-purple-500/20 hover:border-purple-500/40 hover:shadow-md"
            disabled={!isLoaded}
          >
            <HelpCircle className="mr-2 w-4 h-4 group-hover:scale-110 transition-transform duration-300" />
            Need Another Clue?
          </Button>
        </motion.div>
      )}
    </div>
  );
};

export default ClueDisplay;
