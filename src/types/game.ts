
export interface Destination {
  id: string;
  city: string;
  country: string;
  clues: string[];
  funFacts: string[];
  trivia: string[];
  image?: string;
}

export interface GameState {
  currentDestination: Destination | null;
  loading: boolean;
  error: string | null;
  clueIndex: number;
  score: number;
  hasGuessed: boolean;
  isCorrect: boolean | null;
  options: string[];
  remainingDestinations: string[];
  gameOver: boolean;
}

export type GameAction =
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'SET_ERROR'; payload: string | null }
  | { type: 'SET_DESTINATION'; payload: Destination }
  | { type: 'SHOW_NEXT_CLUE' }
  | { type: 'MAKE_GUESS'; payload: string }
  | { type: 'NEXT_DESTINATION' }
  | { type: 'RESET_GAME' };

export interface GameContextType {
  state: GameState;
  dispatch: React.Dispatch<GameAction>;
  makeGuess: (guess: string) => void;
  nextDestination: () => void;
  resetGame: () => void;
  showNextClue: () => void;
}
