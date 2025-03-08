
import React, { useEffect } from 'react';
import { useGameContext } from '@/contexts/GameContext';
import GameCard from '@/components/GameCard';
import ClueDisplay from '@/components/ClueDisplay';
import AnswerOptions from '@/components/AnswerOptions';
import ResultDisplay from '@/components/ResultDisplay';
import ScoreDisplay from '@/components/ScoreDisplay';
import GameBackground from '@/components/GameBackground';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { Home, RefreshCw, Sparkles, Trophy } from 'lucide-react';

const Game = () => {
  const { state, resetGame } = useGameContext();
  const { currentDestination, hasGuessed, gameOver, score } = state;
  
  useEffect(() => {
    // Make sure we have a game in progress
    if (!currentDestination && !gameOver) {
      resetGame();
    }
  }, [currentDestination, gameOver, resetGame]);
  
  if (gameOver) {
    return (
      <div className="min-h-screen flex items-center justify-center p-6 overflow-hidden relative">
        <GameBackground />
        <GameCard title="Game Complete!" className="max-w-lg animate-pop z-10">
          <div className="text-center py-6 space-y-6">
            <div className="flex justify-center">
              <Trophy className="w-16 h-16 text-game-tropical-yellow animate-bounce" />
            </div>
            <h2 className="text-4xl font-bold bg-gradient-arcade text-transparent bg-clip-text">Final Score: {score}</h2>
            <p className="text-xl">
              Congratulations! You've completed your journey around the world.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
              <Button onClick={resetGame} className="arcade-btn flex items-center gap-2">
                <RefreshCw className="w-4 h-4" />
                Play Again
              </Button>
              <Link to="/">
                <Button variant="outline" className="arcade-btn bg-gradient-game flex items-center gap-2">
                  <Home className="w-4 h-4" />
                  Return Home
                </Button>
              </Link>
            </div>
          </div>
        </GameCard>
      </div>
    );
  }
  
  if (!currentDestination) {
    return (
      <div className="min-h-screen flex items-center justify-center relative overflow-hidden">
        <GameBackground />
        <div className="animate-bounce text-center z-10">
          <Sparkles className="w-12 h-12 text-game-electric-purple mb-4 animate-spin-slow" />
          <p className="text-2xl font-bubblegum text-game-electric-purple">Loading your next destination...</p>
        </div>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen flex flex-col relative overflow-hidden">
      <GameBackground />
      
      <header className="border-b-4 border-game-neon-blue bg-white/80 backdrop-blur-lg sticky top-0 z-10 shadow-arcade">
        <div className="container max-w-6xl mx-auto p-4 flex justify-between items-center">
          <Link to="/" className="text-3xl font-bubblegum text-transparent bg-clip-text bg-gradient-arcade hover:opacity-80 transition-opacity">
            Globetrotter
          </Link>
          <div className="flex gap-2">
            <Button variant="ghost" size="sm" onClick={resetGame} className="flex items-center gap-1 hover:bg-game-neon-blue/20 hover:text-game-electric-purple">
              <RefreshCw className="w-4 h-4" />
              Reset
            </Button>
            <Link to="/">
              <Button variant="ghost" size="sm" className="flex items-center gap-1 hover:bg-game-neon-blue/20 hover:text-game-electric-purple">
                <Home className="w-4 h-4" />
                Home
              </Button>
            </Link>
          </div>
        </div>
      </header>
      
      <main className="flex-grow container max-w-4xl mx-auto p-6 flex flex-col items-center justify-center relative z-10">
        {/* Score display at the top */}
        <div className="w-full max-w-2xl mb-6 animate-pop">
          <ScoreDisplay />
        </div>
        
        <GameCard className="w-full max-w-2xl animate-pop">
          {hasGuessed ? (
            <ResultDisplay />
          ) : (
            <div className="space-y-8">
              <ClueDisplay />
              <AnswerOptions />
            </div>
          )}
        </GameCard>
      </main>
      
      <footer className="py-6 text-center text-base relative z-10 bg-gradient-to-r from-game-neon-blue/20 to-game-electric-purple/20 border-t-4 border-game-vibrant-pink">
        <div className="container">
          <p className="font-fredoka">Tap your travel knowledge and guess destinations around the world!</p>
        </div>
      </footer>
    </div>
  );
};

export default Game;
