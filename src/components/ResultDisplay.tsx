
import React, { useEffect, useState } from 'react';
import { useGameContext } from '@/contexts/GameContext';
import { Button } from '@/components/ui/button';
import { Check, X, Globe, ArrowRight } from 'lucide-react';

const ResultDisplay: React.FC = () => {
  const { state, nextDestination } = useGameContext();
  const { currentDestination, hasGuessed, isCorrect } = state;
  const [showAnimation, setShowAnimation] = useState(false);
  const [fadeIn, setFadeIn] = useState(false);
  
  useEffect(() => {
    if (hasGuessed) {
      setShowAnimation(true);
      // Trigger fade-in animation after the success/failure animation
      setTimeout(() => {
        setFadeIn(true);
      }, 800);
      
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
    <div className="space-y-6">
      {/* Success or failure animation */}
      <div className="flex justify-center mb-6">
        {isCorrect ? (
          <div className="relative">
            <div className="w-20 h-20 bg-gradient-to-br from-green-400 to-green-600 rounded-full 
              flex items-center justify-center shadow-lg shadow-green-400/30 animate-scale-in">
              <Check className="w-10 h-10 text-white" />
            </div>
            
            {/* Confetti effect */}
            {showAnimation && (
              <>
                {[...Array(30)].map((_, i) => (
                  <div 
                    key={i}
                    className="confetti absolute"
                    style={{
                      left: `${Math.random() * 300 - 150}px`,
                      top: `${Math.random() * -100}px`,
                      backgroundColor: ['#FFC107', '#2196F3', '#4CAF50', '#E91E63', '#FF9800'][Math.floor(Math.random() * 5)],
                      width: `${5 + Math.random() * 10}px`,
                      height: `${5 + Math.random() * 10}px`,
                      borderRadius: Math.random() > 0.5 ? '50%' : '0',
                      animation: `confetti ${1 + Math.random() * 2}s forwards cubic-bezier(0.1, 0.8, 0.3, 1)`,
                      animationDelay: `${Math.random() * 0.5}s`
                    }}
                  />
                ))}
              </>
            )}
          </div>
        ) : (
          <div className="w-20 h-20 bg-gradient-to-br from-red-400 to-red-600 rounded-full 
            flex items-center justify-center shadow-lg shadow-red-400/30 animate-scale-in">
            <X className="w-10 h-10 text-white" />
          </div>
        )}
      </div>
      
      <div className={`bg-gradient-to-br from-secondary/90 via-secondary/80 to-secondary/90 
        backdrop-blur-lg rounded-xl p-6 border border-primary/10 shadow-lg
        transition-all duration-700 ${fadeIn ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
        
        <h3 className="text-xl font-bold mb-3 flex items-center gap-2">
          {isCorrect ? (
            <>
              <span className="bg-green-100 text-green-700 p-1 rounded">
                <Check className="w-5 h-5" />
              </span>
              <span>Amazing! You got it right!</span>
            </>
          ) : (
            <>
              <span className="bg-red-100 text-red-700 p-1 rounded">
                <X className="w-5 h-5" />
              </span>
              <span>Not quite right this time</span>
            </>
          )}
        </h3>
        
        <p className="mb-5 leading-relaxed">
          {isCorrect 
            ? `Excellent job! You've correctly identified ${currentDestination.city}, ${currentDestination.country}.` 
            : `The correct answer was ${currentDestination.city}, ${currentDestination.country}.`}
        </p>
        
        <div className="bg-white/80 dark:bg-black/20 rounded-lg p-5 mb-5 backdrop-blur-sm border border-primary/5 shadow-inner">
          <div className="flex items-center gap-2 mb-2">
            <Globe className="w-5 h-5 text-primary" />
            <h4 className="font-semibold">Fun Fact:</h4>
          </div>
          <p className="italic leading-relaxed">{fact}</p>
        </div>
        
        {currentDestination.image && (
          <div className="mb-5 overflow-hidden rounded-lg border border-primary/10 shadow-lg">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
              <img 
                src={currentDestination.image} 
                alt={currentDestination.city} 
                className="w-full h-60 object-cover transition-transform duration-3000 hover:scale-110"
                loading="lazy"
              />
              <div className="absolute bottom-3 left-3 bg-black/50 backdrop-blur-sm text-white px-3 py-1 rounded-full text-sm">
                {currentDestination.city}, {currentDestination.country}
              </div>
            </div>
          </div>
        )}
        
        <div className="text-center mt-6">
          <Button 
            onClick={nextDestination} 
            className="px-6 py-6 h-auto text-lg font-medium bg-gradient-to-r from-primary to-primary/90 
              hover:shadow-lg hover:-translate-y-1 transition-all duration-300 group"
          >
            Next Destination
            <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ResultDisplay;
