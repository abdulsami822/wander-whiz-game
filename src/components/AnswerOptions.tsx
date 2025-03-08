
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
          <Button
            key={index}
            variant={isSelected && isCorrect ? "default" : isSelected ? "destructive" : "outline"}
            className={`text-left justify-start py-6 transition-all duration-300 hover-lift
              ${hasGuessed ? 'pointer-events-none' : ''}
              ${isSelected && isCorrect ? 'ring-2 ring-green-500 bg-green-100 text-green-800' : ''}
              ${isSelected && !isCorrect ? 'ring-2 ring-red-500 bg-red-100 text-red-800' : ''}
              ${isWrongSelected ? 'opacity-50' : ''}
            `}
            onClick={() => !hasGuessed && makeGuess(option)}
            disabled={hasGuessed}
          >
            {option}
          </Button>
        );
      })}
    </div>
  );
};

export default AnswerOptions;
