import React from "react";
import { useGameContext } from "@/contexts/GameContext";
import { Button } from "@/components/ui/button";
import { Check, X, Globe } from "lucide-react";

const AnswerOptions: React.FC = () => {
  const { state, makeGuess } = useGameContext();
  const { options, hasGuessed, currentDestination } = state;

  if (!currentDestination) return null;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {options.map((option, index) => {
        return (
          <Button
            key={index}
            variant="outline"
            className={`relative text-left justify-start py-6 h-auto transition-all duration-300 group
              overflow-hidden border-2
              
            `}
            onClick={() => !hasGuessed && makeGuess(option)}
            disabled={hasGuessed}
          >
            {/* Background pattern */}
            <div className="absolute inset-0 opacity-5 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-purple-500 via-transparent to-transparent"></div>

            {/* Icon container */}
            <div className="mr-3 relative">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center border-2`}
              >
                <Globe className="w-4 h-4 text-purple-400 group-hover:scale-110 transition-transform" />
              </div>
            </div>

            <span className="font-medium">
              {option.city}, {option.country}
            </span>

            {/* Hover effect */}
            <div
              className="absolute bottom-0 left-0 h-[2px] w-0 
                bg-gradient-to-r from-purple-500/40 to-pink-500
                group-hover:w-full transition-all duration-500"
            ></div>
          </Button>
        );
      })}
    </div>
  );
};

export default AnswerOptions;
