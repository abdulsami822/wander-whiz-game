
import React, { useEffect, useState } from 'react';
import { useGameContext } from '@/contexts/GameContext';
import { Button } from '@/components/ui/button';
import { Check, X } from 'lucide-react';

const ResultDisplay: React.FC = () => {
  const { state, nextDestination } = useGameContext();
  const { currentDestination, hasGuessed, isCorrect } = state;
  const [showAnimation, setShowAnimation] = useState(false);
  
  useEffect(() => {
    if (hasGuessed) {
      setShowAnimation(true);
      const timer = setTimeout(() => {
        setShowAnimation(false);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [hasGuessed]);
  
  if (!currentDestination || !hasGuessed) return null;
  
  const fact = isCorrect 
    ? currentDestination.funFacts[0] 
    : currentDestination.trivia[0];
  
  return (
    <div className="space-y-4 animate-fade-in">
      {/* Success or failure animation */}
      <div className="flex justify-center mb-4">
        {isCorrect ? (
          <div className="relative">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
              <Check className="w-8 h-8 text-green-600" />
            </div>
            
            {/* Confetti effect */}
            {showAnimation && (
              <>
                {[...Array(20)].map((_, i) => (
                  <div 
                    key={i}
                    className="confetti absolute"
                    style={{
                      left: `${Math.random() * 200 - 100}px`,
                      top: `${Math.random() * -50}px`,
                      backgroundColor: ['#FFC107', '#2196F3', '#4CAF50', '#E91E63'][Math.floor(Math.random() * 4)],
                      animation: `confetti ${1 + Math.random()}s forwards`,
                      animationDelay: `${Math.random() * 0.5}s`
                    }}
                  />
                ))}
              </>
            )}
          </div>
        ) : (
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center">
            <X className="w-8 h-8 text-red-600" />
          </div>
        )}
      </div>
      
      <div className="bg-secondary bg-opacity-80 rounded-lg p-6 border border-primary/10">
        <h3 className="text-xl font-medium mb-2">{isCorrect ? "You got it right!" : "Not quite right"}</h3>
        <p className="mb-4">
          {isCorrect 
            ? `Excellent job! You've correctly identified ${currentDestination.city}, ${currentDestination.country}.` 
            : `The correct answer was ${currentDestination.city}, ${currentDestination.country}.`}
        </p>
        
        <div className="bg-white bg-opacity-60 rounded p-4 mb-4">
          <h4 className="font-medium mb-1">Fun Fact:</h4>
          <p>{fact}</p>
        </div>
        
        {currentDestination.image && (
          <div className="mb-4 overflow-hidden rounded-lg">
            <img 
              src={currentDestination.image} 
              alt={currentDestination.city} 
              className="w-full h-48 object-cover transition-transform duration-3000 hover:scale-110"
              loading="lazy"
            />
          </div>
        )}
        
        <div className="text-center mt-6">
          <Button onClick={nextDestination} className="px-6 hover-lift">
            Next Destination
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ResultDisplay;
