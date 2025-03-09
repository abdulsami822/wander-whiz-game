import React from "react";
import { MAX_ROUNDS, useGameContext } from "@/contexts/GameContext";
import { Progress } from "@/components/ui/progress";
import { Trophy, MapPin, Star, Plane } from "lucide-react";

const ScoreDisplay: React.FC = () => {
  const { state } = useGameContext();
  const { score, round } = state;

  // Calculate progress based on current round
  const totalRounds = MAX_ROUNDS; // Match the maxRounds in GameContext
  const progressPercentage = (round / totalRounds) * 100;
  const progress = Math.max(5, Math.min(100, progressPercentage));

  // Calculate remaining destinations
  const remainingCount = totalRounds - round;

  return (
    <div className="space-y-4 px-8 py-6 pb-12">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-2.5">
          <div className="bg-gradient-to-r from-purple-500 to-pink-500 p-1.5 rounded-full shadow-sm shadow-purple-500/20">
            <Trophy className="w-4 h-4 text-white" />
          </div>
          <span className="font-medium text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500">
            {score} Points
          </span>
          {score > 10 && (
            <div className="flex items-center">
              <Star className="w-3 h-3 text-yellow-400 fill-yellow-400" />
              <Star className="w-3 h-3 text-yellow-400 fill-yellow-400 -ml-1" />
            </div>
          )}
        </div>
        <div className="flex items-center gap-2.5">
          <span className="font-medium text-gray-400">
            {remainingCount} to go
          </span>
          <div className="bg-purple-500/20 p-1.5 rounded-full shadow-sm shadow-purple-500/10">
            <MapPin className="w-4 h-4 text-purple-400" />
          </div>
        </div>
      </div>
      <div className="relative mt-1.5">
        <Progress
          value={progress}
          className="h-3 rounded-full bg-purple-500/10"
          indicatorClassName="bg-gradient-to-r from-purple-500 to-pink-500"
          style={{
            backgroundImage:
              "linear-gradient(90deg, rgba(168, 85, 247, 0.05) 0%, rgba(168, 85, 247, 0.1) 100%)",
          }}
        />
        <div
          className="absolute top-0 bottom-0 left-0 flex items-center transition-all duration-500"
          style={{ left: `${progress}%`, transform: "translateX(-50%)" }}
        >
          <div className="w-8 h-8 flex items-center justify-center">
            <Plane className="w-5 h-5 text-white fill-purple-500 transform rotate-45" />
          </div>
        </div>

        {/* Journey markers */}
        <div className="absolute top-full left-0 right-0 flex justify-between px-1 mt-1">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="flex flex-col items-center">
              <div
                className={`w-1.5 h-1.5 rounded-full ${
                  progress >= (i + 1) * 20
                    ? "bg-purple-400"
                    : "bg-purple-500/20"
                }`}
              />
              {i === 0 && (
                <span className="text-xs text-purple-400 mt-1">Start</span>
              )}
              {i === 4 && (
                <span className="text-xs text-purple-400 mt-1">Finish</span>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ScoreDisplay;
