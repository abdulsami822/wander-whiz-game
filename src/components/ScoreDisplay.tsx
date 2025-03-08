
import React from 'react';
import { useGameContext } from '@/contexts/GameContext';
import { Progress } from '@/components/ui/progress';

const ScoreDisplay: React.FC = () => {
  const { state } = useGameContext();
  const { score, remainingDestinations } = state;
  
  const totalDestinations = remainingDestinations.length;
  const progress = Math.max(5, Math.min(100, (score / (totalDestinations * 2)) * 100));
  
  return (
    <div className="space-y-1">
      <div className="flex justify-between items-center text-sm font-medium">
        <span>Score: {score}</span>
        <span>{remainingDestinations.length} destinations left</span>
      </div>
      <Progress value={progress} className="h-2" />
    </div>
  );
};

export default ScoreDisplay;
