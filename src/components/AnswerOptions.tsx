
import React from 'react';
import { useGameContext } from '@/contexts/GameContext';
import { Button } from '@/components/ui/button';

const AnswerOptions: React.FC = () => {
  const { state, makeGuess } = useGameContext();
  const { options, hasGuessed, isCorrect, currentDestination } = state;
  
  if (!currentDestination) return null;
  
  const correctAnswer = `${currentDestination.city}, ${currentDestination.country}`;
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
      {options.map((option, index) => {
        const isSelected = hasGuessed && option === correctAnswer;
        const isWrongSelected = hasGuessed && option !== correctAnswer && isCorrect === false;
        
        return (
          <button
            key={index}
            className={`option-btn text-left justify-start py-6 transition-all duration-300
              ${hasGuessed ? 'pointer-events-none' : 'hover:animate-wiggle'}
              ${isSelected && isCorrect ? 'bg-gradient-confetti border-2 border-game-lime-green animate-pop' : ''}
              ${isSelected && !isCorrect ? 'bg-gradient-to-r from-red-400 to-red-500 border-2 border-red-600' : ''}
              ${isWrongSelected ? 'opacity-50' : ''}
            `}
            onClick={() => !hasGuessed && makeGuess(option)}
            disabled={hasGuessed}
          >
            <span className="relative z-10">{option}</span>
            {index % 2 === 0 && (
              <div className="absolute top-2 right-2 w-3 h-3 rounded-full bg-game-tropical-yellow animate-pulse-light"></div>
            )}
            {index % 2 === 1 && (
              <div className="absolute top-2 right-2 w-3 h-3 rounded-full bg-game-vibrant-pink animate-pulse-light"></div>
            )}
          </button>
        );
      })}
    </div>
  );
};

export default AnswerOptions;
