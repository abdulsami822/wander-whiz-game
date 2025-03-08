import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error("Missing Supabase environment variables");
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Types for our database tables
export type Destination = {
  id: number;
  city: string;
  country: string;
  clues: string[];
  funFacts: string[];
  trivia: string[];
  difficulty: "easy" | "medium" | "hard";
  image?: string;
  created_at?: string;
};

export type GameSession = {
  id: string;
  created_by: string;
  created_at: string;
  is_active: boolean;
  current_round: number;
  players: string[];
  settings: {
    difficulty: string[];
    rounds: number;
  };
};

export type User = {
  id: string;
  username: string;
  email: string;
  avatar_url?: string;
  created_at: string;
};

// New type for user profiles (for challenge feature)
export type UserProfile = {
  id: string;
  username: string;
  score: number;
  created_at?: string;
};

export async function getOrCreateUserProfile(
  username: string
): Promise<{ username: string; high_score: number } | null> {
  try {
    // Check if user exists
    const { data: existingUser } = await supabase
      .from("users")
      .select("*")
      .eq("username", username)
      .single();

    if (existingUser) {
      return existingUser;
    }

    // If not, create a new user
    const { data: newUser, error } = await supabase
      .from("users")
      .insert([{ username, high_score: 0 }])
      .select()
      .single();

    if (error) throw error;
    return newUser;
  } catch (error) {
    console.error("Error getting/creating user profile:", error);
    return null;
  }
}
export async function updateUserScore(
  username: string,
  score: number
): Promise<void> {
  try {
    const { data: profile } = await supabase
      .from("users")
      .select("*")
      .eq("username", username)
      .single();

    if (profile && profile.high_score < score) {
      await supabase
        .from("users")
        .update({ high_score: score })
        .eq("username", username);
    }
  } catch (error) {
    console.error("Error updating score:", error);
  }
}
