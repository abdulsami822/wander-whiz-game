
import React from 'react';
import { useGameContext } from '@/contexts/GameContext';
import { Progress } from '@/components/ui/progress';
import { Trophy, MapPin } from 'lucide-react';

const ScoreDisplay: React.FC = () => {
  const { state } = useGameContext();
  const { score, remainingDestinations } = state;
  
  const totalDestinations = remainingDestinations.length;
  const progress = Math.max(5, Math.min(100, (score / (totalDestinations * 2)) * 100));
  
  return (
    <div className="bg-white/80 backdrop-blur-md rounded-xl p-4 border-2 border-game-neon-blue shadow-arcade">
      <div className="flex justify-between items-center mb-2">
        <div className="flex items-center gap-2">
          <Trophy className="w-6 h-6 text-game-vibrant-pink animate-bounce" />
          <span className="text-xl font-bold text-game-electric-purple">Score: {score}</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xl font-bold text-game-bright-orange">{remainingDestinations.length}</span>
          <MapPin className="w-6 h-6 text-game-bright-orange" />
          <span className="text-lg">left</span>
        </div>
      </div>
      <Progress 
        value={progress} 
        className="h-4 bg-gradient-to-r from-game-tropical-yellow/30 to-game-vibrant-pink/30" 
      />
      <div 
        className="h-1.5 rounded-full bg-gradient-to-r from-game-tropical-yellow via-game-lime-green to-game-vibrant-pink mt-1 animate-pulse-light"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
};

export default ScoreDisplay;
