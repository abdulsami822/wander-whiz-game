import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useGameContext } from "@/contexts/GameContext";
import { supabase } from "@/lib/supabase";
import { User } from "@supabase/supabase-js";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Users, AlertCircle, Loader2 } from "lucide-react";
import AuthForm from "@/components/Auth/AuthForm";

const JoinGame = () => {
  const { sessionId } = useParams<{ sessionId: string }>();
  const { joinGameSession } = useGameContext();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    // Check if user is authenticated
    const getUser = async () => {
      const { data } = await supabase.auth.getSession();
      setUser(data.session?.user || null);
      setLoading(false);
    };

    getUser();

    const { data: authListener } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setUser(session?.user ?? null);
      }
    );

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);

  useEffect(() => {
    // If we have a session ID and user is authenticated, try to join the game
    const joinGame = async () => {
      if (!sessionId || !user) return;

      setLoading(true);
      setError(null);

      try {
        await joinGameSession(sessionId);
        navigate("/game");
      } catch (error: Error | unknown) {
        const errorMessage =
          error instanceof Error
            ? error.message
            : "Failed to join game session";
        setError(errorMessage);
      } finally {
        setLoading(false);
      }
    };

    joinGame();
  }, [sessionId, user, joinGameSession, navigate]);

  if (!sessionId) {
    return (
      <div className="min-h-screen flex items-center justify-center p-6 bg-gradient-to-b from-[#2a2b36] to-[#1a1b26]">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4 text-white">
            Invalid Game Session
          </h1>
          <p className="text-gray-400 mb-6">No game session ID was provided.</p>
          <Button
            onClick={() => navigate("/")}
            className="bg-purple-500 hover:bg-purple-600"
          >
            Return Home
          </Button>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center p-6 bg-gradient-to-b from-[#2a2b36] to-[#1a1b26]">
        <div className="max-w-md w-full">
          <div className="text-center mb-6">
            <h1 className="text-2xl font-bold text-white">Join Game Session</h1>
            <p className="text-gray-400">
              Sign in or create an account to join the game
            </p>
          </div>
          <AuthForm />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-gradient-to-b from-[#2a2b36] to-[#1a1b26]">
      <Card className="w-full max-w-md bg-[#1a1b26]/80 backdrop-blur-sm border-2 border-purple-500/20">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500">
            Joining Game Session
          </CardTitle>
          <CardDescription className="text-center text-gray-400">
            Connecting to the multiplayer game
          </CardDescription>
        </CardHeader>
        <CardContent className="text-center">
          {error ? (
            <>
              <Alert variant="destructive" className="mb-4">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>{error}</AlertDescription>
              </Alert>
              <Button onClick={() => navigate("/")} className="mt-4">
                Return Home
              </Button>
            </>
          ) : (
            <div className="py-8 flex flex-col items-center">
              <Loader2 className="h-12 w-12 text-purple-500 animate-spin mb-4" />
              <p className="text-gray-300">Joining game session...</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default JoinGame;
