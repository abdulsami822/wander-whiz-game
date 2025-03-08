import React from "react";
import { useGameContext } from "@/contexts/GameContext";
import { Button } from "@/components/ui/button";
import { Check, X, Globe } from "lucide-react";

const AnswerOptions: React.FC = () => {
  const { state, makeGuess } = useGameContext();
  const { options, hasGuessed, isCorrect, currentDestination } = state;

  if (!currentDestination) return null;

  const correctAnswer = `${currentDestination.city}, ${currentDestination.country}`;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {options.map((option, index) => {
        const isSelected = hasGuessed && option === correctAnswer;
        const isIncorrectSelected =
          hasGuessed && !isCorrect && option !== correctAnswer;
        const isCorrectUnselected =
          hasGuessed && option === correctAnswer && !isCorrect;

        return (
          <Button
            key={index}
            variant="outline"
            className={`relative text-left justify-start py-6 h-auto transition-all duration-300 group
              overflow-hidden border-2
              ${
                hasGuessed
                  ? "pointer-events-none"
                  : "hover:-translate-y-1 hover:shadow-lg"
              }
              ${
                isSelected && isCorrect
                  ? "border-green-500 bg-green-500/10 text-green-400"
                  : ""
              }
              ${
                isSelected && !isCorrect
                  ? "border-red-500 bg-red-500/10 text-red-400"
                  : ""
              }
              ${
                isCorrectUnselected
                  ? "border-green-500 bg-green-500/5 text-green-400/70"
                  : ""
              }
              ${isIncorrectSelected ? "opacity-50" : ""}
              ${
                !hasGuessed
                  ? "border-purple-500/20 hover:border-purple-500/40 text-gray-300"
                  : ""
              }
            `}
            onClick={() => !hasGuessed && makeGuess(option)}
            disabled={hasGuessed}
          >
            {/* Background pattern */}
            <div className="absolute inset-0 opacity-5 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-purple-500 via-transparent to-transparent"></div>

            {/* Icon container */}
            <div className="mr-3 relative">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center border-2
                ${
                  hasGuessed
                    ? ""
                    : "border-purple-500/30 bg-purple-500/5 group-hover:border-purple-500 group-hover:bg-purple-500/10"
                }
                ${
                  isSelected && isCorrect
                    ? "border-green-500 bg-green-500/20"
                    : ""
                }
                ${
                  isSelected && !isCorrect ? "border-red-500 bg-red-500/20" : ""
                }
                ${isCorrectUnselected ? "border-green-500 bg-green-500/10" : ""}
                transition-all duration-300
              `}
              >
                {isSelected && isCorrect && (
                  <Check className="w-4 h-4 text-green-400" />
                )}
                {isSelected && !isCorrect && (
                  <X className="w-4 h-4 text-red-400" />
                )}
                {isCorrectUnselected && (
                  <Check className="w-4 h-4 text-green-400/70" />
                )}
                {!hasGuessed && (
                  <Globe className="w-4 h-4 text-purple-400 group-hover:scale-110 transition-transform" />
                )}
              </div>
            </div>

            <span className="font-medium">{option}</span>

            {/* Hover effect */}
            {!hasGuessed && (
              <div
                className="absolute bottom-0 left-0 h-[2px] w-0 
                bg-gradient-to-r from-purple-500/40 to-pink-500
                group-hover:w-full transition-all duration-500"
              ></div>
            )}
          </Button>
        );
      })}
    </div>
  );
};

export default AnswerOptions;
