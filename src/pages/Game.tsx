
import React, { useEffect } from 'react';
import { useGameContext } from '@/contexts/GameContext';
import GameCard from '@/components/GameCard';
import ClueDisplay from '@/components/ClueDisplay';
import AnswerOptions from '@/components/AnswerOptions';
import ResultDisplay from '@/components/ResultDisplay';
import ScoreDisplay from '@/components/ScoreDisplay';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { Home, RefreshCw } from 'lucide-react';

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
      <div className="min-h-screen flex items-center justify-center p-6 bg-gradient-to-b from-blue-50 to-white dark:from-blue-900 dark:to-gray-900">
        <GameCard title="Game Over!" className="max-w-lg animate-scale-in">
          <div className="text-center py-6 space-y-6">
            <h2 className="text-4xl font-bold">Final Score: {score}</h2>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              Congratulations! You've completed your journey around the world.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
              <Button onClick={resetGame} className="flex items-center gap-2 hover-lift">
                <RefreshCw className="w-4 h-4" />
                Play Again
              </Button>
              <Link to="/">
                <Button variant="outline" className="flex items-center gap-2 hover-lift">
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
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-pulse text-center">
          <p className="text-xl">Loading your next destination...</p>
        </div>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-blue-50 to-white dark:from-blue-900 dark:to-gray-900">
      <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-10 shadow-sm">
        <div className="container max-w-6xl mx-auto p-4 flex justify-between items-center">
          <Link to="/" className="text-2xl font-bold text-primary hover:opacity-80 transition-opacity">
            Globetrotter
          </Link>
          <div className="flex gap-2">
            <Button variant="ghost" size="sm" onClick={resetGame} className="flex items-center gap-1">
              <RefreshCw className="w-4 h-4" />
              Reset
            </Button>
            <Link to="/">
              <Button variant="ghost" size="sm" className="flex items-center gap-1">
                <Home className="w-4 h-4" />
                Home
              </Button>
            </Link>
          </div>
        </div>
      </header>
      
      <main className="flex-grow container max-w-4xl mx-auto p-6 flex flex-col items-center justify-center">
        {/* Score display at the top */}
        <div className="w-full max-w-2xl mb-6">
          <ScoreDisplay />
        </div>
        
        <GameCard className="w-full max-w-2xl animate-fade-in">
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
      
      <footer className="py-6 text-center text-sm text-gray-500">
        <div className="container">
          <p>Tap your travel knowledge and guess destinations around the world!</p>
        </div>
      </footer>
    </div>
  );
};

export default Game;
