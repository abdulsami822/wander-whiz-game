
import React from 'react';
import { useGameContext } from '@/contexts/GameContext';
import { Progress } from '@/components/ui/progress';
import { Compass, MapPin, PlaneTakeoff } from 'lucide-react';

const ScoreDisplay: React.FC = () => {
  const { state } = useGameContext();
  const { score, remainingDestinations } = state;
  
  const totalDestinations = remainingDestinations.length;
  const progress = Math.max(5, Math.min(100, (score / (totalDestinations * 2)) * 100));
  
  return (
    <div className="space-y-2">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-2">
          <div className="bg-primary/20 p-1.5 rounded-full">
            <Compass className="w-4 h-4 text-primary animate-pulse-light" />
          </div>
          <span className="font-medium">Score: {score}</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="font-medium">{remainingDestinations.length} destinations left</span>
          <div className="bg-primary/20 p-1.5 rounded-full">
            <MapPin className="w-4 h-4 text-primary animate-pulse-light" />
          </div>
        </div>
      </div>
      <div className="relative">
        <Progress value={progress} className="h-3 rounded-full" />
        <div 
          className="absolute top-0 bottom-0 left-0 flex items-center transition-all duration-500"
          style={{ left: `${progress}%`, transform: 'translateX(-50%)' }}
        >
          <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center shadow-md animate-float">
            <PlaneTakeoff className="w-3 h-3 text-white" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ScoreDisplay;
