
import React, { useState, useEffect } from 'react';
import { useGameContext } from '@/contexts/GameContext';
import { Button } from '@/components/ui/button';

const ClueDisplay: React.FC = () => {
  const { state, showNextClue } = useGameContext();
  const { currentDestination, clueIndex, hasGuessed } = state;
  const [typing, setTyping] = useState(true);
  
  useEffect(() => {
    setTyping(true);
    const timer = setTimeout(() => {
      setTyping(false);
    }, 2000); // Adjust typewriter animation duration
    
    return () => clearTimeout(timer);
  }, [clueIndex, currentDestination]);
  
  if (!currentDestination) return null;
  
  const currentClue = currentDestination.clues[clueIndex];
  const hasMoreClues = clueIndex < currentDestination.clues.length - 1;

  return (
    <div className="space-y-4">
      <div className="bg-secondary bg-opacity-60 rounded-lg p-4">
        <p className={`clue-text ${typing ? 'typewriter' : ''}`}>
          {currentClue}
        </p>
      </div>
      
      {!hasGuessed && hasMoreClues && (
        <div className="flex justify-center">
          <Button 
            variant="outline" 
            onClick={showNextClue}
            className="hover-lift"
            disabled={typing}
          >
            Need Another Clue?
          </Button>
        </div>
      )}
    </div>
  );
};

export default ClueDisplay;
