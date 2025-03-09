import React, {
  createContext,
  useContext,
  useReducer,
  useEffect,
  useState,
  useCallback,
} from "react";
import {
  supabase,
  Destination,
  getOrCreateUserProfile,
  updateUserScore,
} from "@/lib/supabase";
import { ChallengeDialog } from "@/components/ChallengeDialog"; // Add this import

// Types
type Difficulty = "easy" | "medium" | "hard";

interface GameState {
  destinations: Destination[];
  currentDestination: Destination | null;
  options: { city: string; country: string }[];
  clueIndex: number;
  score: number;
  round: number;
  hasGuessed: boolean;
  isCorrect: boolean;
  gameOver: boolean;
  loading: boolean;
  error: string | null;
  sessionId?: string;
  difficulty: Difficulty[];
  // New challenge-related state
  username: string | null;
  challengeUsername: string | null;
  challengeScore: number | null;
}

// Actions
type GameAction =
  | { type: "SET_DESTINATIONS"; payload: Destination[] }
  | { type: "SET_CURRENT_DESTINATION"; payload: Destination }
  | { type: "SET_OPTIONS"; payload: { city: string; country: string }[] }
  | { type: "SHOW_NEXT_CLUE" }
  | { type: "MAKE_GUESS"; payload: { city: string; country: string } }
  | { type: "NEXT_DESTINATION" }
  | {
      type: "RESET_GAME";
      payload?: { difficulty?: Difficulty[]; clearChallenge?: boolean };
    }
  | { type: "SET_LOADING"; payload: boolean }
  | { type: "SET_ERROR"; payload: string | null }
  | { type: "SET_SESSION"; payload: string }
  | { type: "SET_DIFFICULTY"; payload: Difficulty[] }
  // New challenge-related actions
  | { type: "SET_USERNAME"; payload: string }
  | {
      type: "SET_CHALLENGE_INFO";
      payload: { username: string; score: number };
    };

// Initial state
const initialState: GameState = {
  destinations: [],
  currentDestination: null,
  options: [],
  clueIndex: 0,
  score: 0,
  round: 0,
  hasGuessed: false,
  isCorrect: false,
  gameOver: false,
  loading: true,
  error: null,
  difficulty: ["easy", "medium", "hard"],
  // New challenge-related initial state
  username: null,
  challengeUsername: null,
  challengeScore: null,
};

export const MAX_ROUNDS = 3;

// Reducer
// In the gameReducer function, we need to handle the SET_USERNAME and SET_CHALLENGE_INFO actions
function gameReducer(state: GameState, action: GameAction): GameState {
  switch (action.type) {
    case "SET_DESTINATIONS":
      return { ...state, destinations: action.payload };
    case "SET_CURRENT_DESTINATION":
      return {
        ...state,
        currentDestination: action.payload,
        clueIndex: 0,
        hasGuessed: false,
      };
    case "SET_OPTIONS":
      return { ...state, options: action.payload };
    case "SHOW_NEXT_CLUE":
      return {
        ...state,
        clueIndex: Math.min(
          state.clueIndex + 1,
          state.currentDestination?.clues.length - 1 || 0
        ),
      };
    case "MAKE_GUESS": {
      const isCorrect =
        state.currentDestination?.city === action.payload.city &&
        state.currentDestination?.country === action.payload.country;

      // Calculate score based on number of clues used and correctness
      const clueScore = state.currentDestination?.clues.length
        ? Math.max(1, state.currentDestination.clues.length - state.clueIndex)
        : 1;

      const difficultyMultiplier =
        state.currentDestination?.difficulty === "easy"
          ? 1
          : state.currentDestination?.difficulty === "medium"
          ? 2
          : 3;

      const pointsEarned = isCorrect
        ? clueScore * difficultyMultiplier * 10
        : 0;

      return {
        ...state,
        hasGuessed: true,
        isCorrect,
        score: state.score + pointsEarned,
      };
    }
    case "NEXT_DESTINATION": {
      const newRound = state.round + 1;
      const maxRounds = MAX_ROUNDS; // Configurable game length
      const gameOver = newRound >= maxRounds;

      // If the game is over and we have a username, update the high score
      if (gameOver && state.username) {
        updateUserScore(state.username, state.score);
      }

      return {
        ...state,
        round: newRound,
        gameOver,
      };
    }
    case "RESET_GAME":
      return {
        ...initialState,
        destinations: state.destinations,
        difficulty: action.payload?.difficulty || state.difficulty,
        loading: false,
        username: state.username, // Preserve username on reset
        // Only preserve challenge info if not explicitly clearing it
        challengeUsername: action.payload?.clearChallenge
          ? null
          : state.challengeUsername,
        challengeScore: action.payload?.clearChallenge
          ? null
          : state.challengeScore,
      };

    case "SET_LOADING":
      return { ...state, loading: action.payload };
    case "SET_ERROR":
      return { ...state, error: action.payload };
    case "SET_SESSION":
      return { ...state, sessionId: action.payload };
    case "SET_DIFFICULTY":
      return { ...state, difficulty: action.payload };
    case "SET_USERNAME":
      return { ...state, username: action.payload };
    case "SET_CHALLENGE_INFO":
      return {
        ...state,
        challengeUsername: action.payload.username,
        challengeScore: action.payload.score,
      };
    default:
      return state;
  }
}

// Context
const GameContext = createContext<
  | {
      state: GameState;
      dispatch: React.Dispatch<GameAction>;
      showNextClue: () => void;
      makeGuess: (option: { city: string; country: string }) => void;
      nextDestination: () => void;
      resetGame: (options?: {
        difficulty?: Difficulty[];
        clearChallenge?: boolean;
      }) => void;
      createGameSession: () => Promise<string>;
      joinGameSession: (sessionId: string) => Promise<void>;
      setDifficulty: (difficulty: Difficulty[]) => void;
      // New challenge-related functions
      setUsername: (username: string) => Promise<void>;
      generateChallengeUrl: () => string;
      openChallengeDialog: () => void;
    }
  | undefined
>(undefined);

// Provider
export const GameProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [state, dispatch] = useReducer(gameReducer, initialState);
  const [isChallengeDialogOpen, setIsChallengeDialogOpen] = useState(false);

  // Helper function to set up a new destination - memoized with useCallback
  const setupNewDestination = useCallback(() => {
    if (state.destinations.length === 0) return;
    // Get a random destination
    const randomIndex = Math.floor(Math.random() * state.destinations.length);
    const destination = state.destinations[randomIndex];
    // Generate options (including the correct answer)
    const correctOption = {
      city: destination.city,
      country: destination.country,
    };
    const otherOptions = state.destinations
      .filter((d) => d.id !== destination.id)
      .sort(() => 0.5 - Math.random())
      .slice(0, 3)
      .map((d) => ({ city: d.city, country: d.country }));
    const options = [...otherOptions, correctOption].sort(
      () => 0.5 - Math.random()
    );
    dispatch({ type: "SET_CURRENT_DESTINATION", payload: destination });
    dispatch({ type: "SET_OPTIONS", payload: options });
  }, [state.destinations]);

  // Fetch destinations from Supabase
  useEffect(() => {
    let isMounted = true;

    async function fetchDestinations() {
      // Skip if we already have destinations for the current difficulty
      if (state.destinations.length > 0) {
        return;
      }

      try {
        dispatch({ type: "SET_LOADING", payload: true });

        // Filter by selected difficulty levels
        const { data, error } = await supabase
          .from("destinations")
          .select("*")
          .in("difficulty", state.difficulty);

        if (error) throw error;

        if (data && isMounted) {
          // Transform data to match our frontend structure if needed
          const destinations = data.map((item) => ({
            id: item.id,
            city: item.name,
            country: item.country,
            clues: item.clues,
            funFacts: item.fun_facts,
            trivia: item.trivia,
            difficulty: item.difficulty,
            image: item.image_url,
          }));

          dispatch({ type: "SET_DESTINATIONS", payload: destinations });
        }

        if (isMounted) {
          dispatch({ type: "SET_LOADING", payload: false });
        }
      } catch (error) {
        console.error("Error fetching destinations:", error);
        if (isMounted) {
          dispatch({
            type: "SET_ERROR",
            payload: "Failed to load destinations",
          });
          dispatch({ type: "SET_LOADING", payload: false });
        }
      }
    }
    fetchDestinations();

    return () => {
      isMounted = false;
    };
  }, [state.difficulty, state.destinations.length]);
  // Set up a new destination when needed
  useEffect(() => {
    if (
      state.destinations.length > 0 &&
      !state.currentDestination &&
      !state.gameOver &&
      !state.loading
    ) {
      setupNewDestination();
    }
  }, [
    state.destinations,
    state.currentDestination,
    state.gameOver,
    state.loading,
  ]);
  // Actions
  const showNextClue = () => {
    dispatch({ type: "SHOW_NEXT_CLUE" });
  };

  const makeGuess = (option: { city: string; country: string }) => {
    dispatch({ type: "MAKE_GUESS", payload: option });
  };

  const nextDestination = () => {
    dispatch({ type: "NEXT_DESTINATION" });
    setupNewDestination();
  };

  const resetGame = (options?: {
    difficulty?: Difficulty[];
    clearChallenge?: boolean;
  }) => {
    dispatch({ type: "RESET_GAME", payload: options });
  };

  const setDifficulty = (difficulty: Difficulty[]) => {
    // Clear destinations first to force a refetch
    dispatch({ type: "SET_DESTINATIONS", payload: [] });
    dispatch({ type: "SET_DIFFICULTY", payload: difficulty });
  };
  // Multiplayer functions
  const createGameSession = async (): Promise<string> => {
    try {
      const { data: sessionData } = await supabase.auth.getSession();
      const user = sessionData.session?.user;

      if (!user) {
        throw new Error("You must be logged in to create a game session");
      }

      interface GameSessionResponse {
        id: string;
        created_by: string;
        is_active: boolean;
        current_round: number;
        players: string[];
        settings: {
          difficulty: Difficulty[];
          rounds: number;
        };
      }

      const { data, error } = await supabase
        .from("game_sessions")
        .insert({
          created_by: user.id,
          is_active: true,
          current_round: 0,
          players: [user.id],
          settings: {
            difficulty: state.difficulty,
            rounds: 10,
          },
        })
        .single<GameSessionResponse>();

      if (error) throw error;

      if (data) {
        dispatch({ type: "SET_SESSION", payload: data.id });
        return data.id;
      }

      throw new Error("Failed to create game session");
    } catch (error) {
      console.error("Error creating game session:", error);
      dispatch({ type: "SET_ERROR", payload: "Failed to create game session" });
      throw error;
    }
  };
  const joinGameSession = async (sessionId: string): Promise<void> => {
    try {
      const { data: sessionData } = await supabase.auth.getSession();
      const user = sessionData.session?.user;

      if (!user) {
        throw new Error("You must be logged in to join a game session");
      }

      // Get the current session
      const { data: session, error: sessionError } = await supabase
        .from("game_sessions")
        .select("*")
        .eq("id", sessionId)
        .single();

      if (sessionError) throw sessionError;

      if (!session) {
        throw new Error("Game session not found");
      }

      if (!session.is_active) {
        throw new Error("This game session has ended");
      }

      // Add the player to the session if not already present
      if (!session.players.includes(user.id)) {
        const { error: updateError } = await supabase
          .from("game_sessions")
          .update({
            players: [...session.players, user.id],
          })
          .eq("id", sessionId);

        if (updateError) throw updateError;
      }

      // Set the session in state
      dispatch({ type: "SET_SESSION", payload: sessionId });

      // Set the difficulty from the session settings
      if (session.settings?.difficulty) {
        dispatch({
          type: "SET_DIFFICULTY",
          payload: session.settings.difficulty,
        });
      }
    } catch (error) {
      console.error("Error joining game session:", error);
      dispatch({ type: "SET_ERROR", payload: "Failed to join game session" });
      throw error;
    }
  };
  // Add challenge-related functions
  const setUsername = async (username: string): Promise<void> => {
    try {
      // We already have the username, so we can just update the state directly
      // No need to call getOrCreateUserProfile again since the user is already created
      // in the UsernameRegistration component
      dispatch({ type: "SET_USERNAME", payload: username });
      localStorage.setItem("wanderwhiz_username", username);

      // Update the user's score if needed (only if we have a score to update)
      if (state.score > 0) {
        await updateUserScore(username, state.score);
      }
    } catch (error) {
      console.error("Error setting username:", error);
      dispatch({ type: "SET_ERROR", payload: "Failed to set username" });
    }
  };

  const generateChallengeUrl = (): string => {
    const baseUrl = window.location.origin;
    return `${baseUrl}/game?challenge=${encodeURIComponent(
      state.username || ""
    )}&score=${state.score}`;
  };

  const openChallengeDialog = (): void => {
    setIsChallengeDialogOpen(true);
  };

  // Check for challenge parameters in URL
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const challengeUsername = params.get("challenge");
    const challengeScore = params.get("score");

    if (challengeUsername && challengeScore) {
      dispatch({
        type: "SET_CHALLENGE_INFO",
        payload: {
          username: challengeUsername,
          score: parseInt(challengeScore, 10) || 0,
        },
      });

      // Show a challenge notification to the user
      const score = parseInt(challengeScore, 10) || 0;

      // You can use your toast system or create a modal here
      // For example, using the toast system:
      if (typeof window !== "undefined") {
        // Wait for components to be mounted
        setTimeout(() => {
          const event = new CustomEvent("show-challenge-notification", {
            detail: { username: challengeUsername, score },
          });
          window.dispatchEvent(event);
        }, 500);
      }
    }
  }, []);

  // Load username from localStorage on initial load
  useEffect(() => {
    const storedUsername = localStorage.getItem("wanderwhiz_username");
    if (storedUsername) {
      dispatch({ type: "SET_USERNAME", payload: storedUsername });
    }
  }, []);

  return (
    <GameContext.Provider
      value={{
        state,
        dispatch,
        showNextClue,
        makeGuess,
        nextDestination,
        resetGame,
        createGameSession,
        joinGameSession,
        setDifficulty,
        // Challenge-related functions
        setUsername,
        generateChallengeUrl,
        openChallengeDialog,
      }}
    >
      {children}
      {isChallengeDialogOpen && (
        <ChallengeDialog
          open={isChallengeDialogOpen}
          onOpenChange={setIsChallengeDialogOpen}
        />
      )}
    </GameContext.Provider>
  );
};

// Hook
export const useGameContext = () => {
  const context = useContext(GameContext);
  if (context === undefined) {
    throw new Error("useGameContext must be used within a GameProvider");
  }
  return context;
};
