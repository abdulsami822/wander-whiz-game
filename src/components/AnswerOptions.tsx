
import React from 'react';
import { useGameContext } from '@/contexts/GameContext';
import { Button } from '@/components/ui/button';
import { Check, X, Globe } from 'lucide-react';

const AnswerOptions: React.FC = () => {
  const { state, makeGuess } = useGameContext();
  const { options, hasGuessed, isCorrect, currentDestination } = state;
  
  if (!currentDestination) return null;
  
  const correctAnswer = `${currentDestination.city}, ${currentDestination.country}`;
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {options.map((option, index) => {
        const isSelected = hasGuessed && option === correctAnswer;
        const isIncorrectSelected = hasGuessed && !isCorrect && option !== correctAnswer;
        const isCorrectUnselected = hasGuessed && option === correctAnswer && !isCorrect;
        
        return (
          <Button
            key={index}
            variant="outline"
            className={`relative text-left justify-start py-6 h-auto transition-all duration-300 group
              overflow-hidden border-2
              ${hasGuessed ? 'pointer-events-none' : 'hover:-translate-y-1 hover:shadow-lg'}
              ${isSelected && isCorrect ? 'border-green-500 bg-green-50 text-green-800' : ''}
              ${isSelected && !isCorrect ? 'border-red-500 bg-red-50 text-red-800' : ''}
              ${isCorrectUnselected ? 'border-green-500 bg-green-50/50 text-green-800/70' : ''}
              ${isIncorrectSelected ? 'opacity-50' : ''}
            `}
            onClick={() => !hasGuessed && makeGuess(option)}
            disabled={hasGuessed}
          >
            {/* Background pattern */}
            <div className="absolute inset-0 opacity-5 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-primary via-transparent to-transparent"></div>
            
            {/* Icon container */}
            <div className="mr-3 relative">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center border-2
                ${hasGuessed ? '' : 'border-primary/30 bg-primary/5 group-hover:border-primary group-hover:bg-primary/10'}
                ${isSelected && isCorrect ? 'border-green-500 bg-green-100' : ''}
                ${isSelected && !isCorrect ? 'border-red-500 bg-red-100' : ''}
                ${isCorrectUnselected ? 'border-green-500 bg-green-100/50' : ''}
                transition-all duration-300
              `}>
                {isSelected && isCorrect && <Check className="w-4 h-4 text-green-600" />}
                {isSelected && !isCorrect && <X className="w-4 h-4 text-red-600" />}
                {isCorrectUnselected && <Check className="w-4 h-4 text-green-600/70" />}
                {!hasGuessed && <Globe className="w-4 h-4 text-primary/70 group-hover:scale-110 transition-transform" />}
              </div>
            </div>
            
            <span className="font-medium">{option}</span>
            
            {/* Hover effect */}
            {!hasGuessed && (
              <div className="absolute bottom-0 left-0 h-[2px] w-0 
                bg-gradient-to-r from-primary/40 to-primary
                group-hover:w-full transition-all duration-500"></div>
            )}
          </Button>
        );
      })}
    </div>
  );
};

export default AnswerOptions;
