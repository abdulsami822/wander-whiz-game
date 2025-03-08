import React, { createContext, useContext, useReducer, ReactNode } from 'react';
import { GameState, GameAction, GameContextType, Destination } from '@/types/game';
import { destinations, generateOptions } from '@/data/destinations';
import { toast } from '@/hooks/use-toast';

const initialState: GameState = {
  currentDestination: null,
  loading: false,
  error: null,
  clueIndex: 0,
  score: 0,
  hasGuessed: false,
  isCorrect: null,
  options: [],
  remainingDestinations: destinations.map(dest => dest.id),
  gameOver: false
};

function gameReducer(state: GameState, action: GameAction): GameState {
  switch (action.type) {
    case 'SET_LOADING':
      return { ...state, loading: action.payload };
    case 'SET_ERROR':
      return { ...state, error: action.payload };
    case 'SET_DESTINATION': {
      const destination = action.payload;
      const correctAnswer = `${destination.city}, ${destination.country}`;
      const options = generateOptions(correctAnswer);
      
      return {
        ...state,
        currentDestination: destination,
        loading: false,
        error: null,
        clueIndex: 0,
        hasGuessed: false,
        isCorrect: null,
        options
      };
    }
    case 'SHOW_NEXT_CLUE':
      if (state.clueIndex < (state.currentDestination?.clues.length || 1) - 1) {
        return { ...state, clueIndex: state.clueIndex + 1 };
      }
      return state;
    case 'MAKE_GUESS': {
      if (!state.currentDestination) return state;
      
      const correctAnswer = `${state.currentDestination.city}, ${state.currentDestination.country}`;
      const isCorrect = action.payload === correctAnswer;
      
      return {
        ...state,
        hasGuessed: true,
        isCorrect,
        score: isCorrect ? state.score + (2 - state.clueIndex) : state.score
      };
    }
    case 'NEXT_DESTINATION': {
      if (!state.currentDestination) return state;
      
      const currentDestId = state.currentDestination.id;
      const newRemaining = state.remainingDestinations.filter(id => id !== currentDestId);
      
      // If no more destinations, game is over
      if (newRemaining.length === 0) {
        return { ...state, gameOver: true };
      }
      
      // Otherwise, pick a random new destination
      const randomIndex = Math.floor(Math.random() * newRemaining.length);
      const nextDestId = newRemaining[randomIndex];
      const nextDestination = destinations.find(dest => dest.id === nextDestId);
      
      if (!nextDestination) {
        return {
          ...state,
          error: "Couldn't find next destination",
          gameOver: true
        };
      }
      
      const correctAnswer = `${nextDestination.city}, ${nextDestination.country}`;
      const options = generateOptions(correctAnswer);
      
      return {
        ...state,
        currentDestination: nextDestination,
        clueIndex: 0,
        hasGuessed: false,
        isCorrect: null,
        options,
        remainingDestinations: newRemaining
      };
    }
    case 'RESET_GAME':
      return {
        ...initialState,
        remainingDestinations: destinations.map(dest => dest.id)
      };
    default:
      return state;
  }
}

const GameContext = createContext<GameContextType | undefined>(undefined);

export function GameProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(gameReducer, initialState);
  
  // Helper functions that will be provided in the context
  const makeGuess = (guess: string) => {
    dispatch({ type: 'MAKE_GUESS', payload: guess });
    
    if (state.currentDestination) {
      const correctAnswer = `${state.currentDestination.city}, ${state.currentDestination.country}`;
      if (guess === correctAnswer) {
        toast({
          title: "Correct!",
          description: "You guessed it right!",
          variant: "default",
        });
      } else {
        toast({
          title: "Not quite!",
          description: `The answer was ${correctAnswer}`,
          variant: "destructive",
        });
      }
    }
  };
  
  const nextDestination = () => {
    dispatch({ type: 'NEXT_DESTINATION' });
  };
  
  const resetGame = () => {
    dispatch({ type: 'RESET_GAME' });
    
    // Get a random destination to start
    const randomIndex = Math.floor(Math.random() * destinations.length);
    const firstDestination = destinations[randomIndex];
    
    dispatch({ type: 'SET_DESTINATION', payload: firstDestination });
  };
  
  const showNextClue = () => {
    dispatch({ type: 'SHOW_NEXT_CLUE' });
  };
  
  // Start the game with a random destination if there's none
  React.useEffect(() => {
    if (!state.currentDestination && !state.gameOver) {
      resetGame();
    }
  }, [state.currentDestination, state.gameOver]);
  
  return (
    <GameContext.Provider
      value={{
        state,
        dispatch,
        makeGuess,
        nextDestination,
        resetGame,
        showNextClue
      }}
    >
      {children}
    </GameContext.Provider>
  );
}

export function useGameContext() {
  const context = useContext(GameContext);
  if (context === undefined) {
    throw new Error('useGameContext must be used within a GameProvider');
  }
  return context;
}
