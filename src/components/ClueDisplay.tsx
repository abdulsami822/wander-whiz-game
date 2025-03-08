
import React, { useState, useEffect } from 'react';
import { useGameContext } from '@/contexts/GameContext';
import { Button } from '@/components/ui/button';
import { HelpCircle, Map } from 'lucide-react';

const ClueDisplay: React.FC = () => {
  const { state, showNextClue } = useGameContext();
  const { currentDestination, clueIndex, hasGuessed } = state;
  const [typing, setTyping] = useState(true);
  const [animate, setAnimate] = useState(false);
  
  useEffect(() => {
    setTyping(true);
    setAnimate(true);
    const typingTimer = setTimeout(() => {
      setTyping(false);
    }, 2000); // Adjust typewriter animation duration
    
    const animateTimer = setTimeout(() => {
      setAnimate(false);
    }, 800);
    
    return () => {
      clearTimeout(typingTimer);
      clearTimeout(animateTimer);
    };
  }, [clueIndex, currentDestination]);
  
  if (!currentDestination) return null;
  
  const currentClue = currentDestination.clues[clueIndex];
  const hasMoreClues = clueIndex < currentDestination.clues.length - 1;

  return (
    <div className="space-y-4">
      <div className="relative">
        <div className={`absolute -left-2 top-1/2 transform -translate-y-1/2 bg-primary/20 p-2 rounded-full
          ${animate ? 'scale-110' : 'scale-100'} transition-transform duration-300`}>
          <Map className="w-5 h-5 text-primary" />
        </div>
        
        <div className="bg-secondary/80 backdrop-blur-sm rounded-lg p-5 pl-8 shadow-inner border border-primary/10">
          <p className={`clue-text ${typing ? 'typewriter' : ''} font-medium`}>
            {currentClue}
          </p>
        </div>
      </div>
      
      {!hasGuessed && hasMoreClues && (
        <div className="flex justify-center pt-2">
          <Button 
            variant="outline" 
            onClick={showNextClue}
            className="group hover:bg-primary/10 hover:text-primary transition-all
              duration-300 border-primary/20 hover:border-primary/40 hover:shadow-md"
            disabled={typing}
          >
            <HelpCircle className="mr-2 w-4 h-4 group-hover:scale-110 transition-transform duration-300" />
            Need Another Clue?
          </Button>
        </div>
      )}
    </div>
  );
};

export default ClueDisplay;
