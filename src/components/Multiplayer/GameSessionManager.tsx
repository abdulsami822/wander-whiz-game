import React, { useState } from "react";
import { useGameContext } from "@/contexts/GameContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Users, Share2, Copy, AlertCircle } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export const GameSessionManager: React.FC = () => {
  const { createGameSession, joinGameSession } = useGameContext();
  const [sessionId, setSessionId] = useState("");
  const [createdSessionId, setCreatedSessionId] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const handleCreateSession = async () => {
    setLoading(true);
    setError(null);

    try {
      const newSessionId = await createGameSession();
      setCreatedSessionId(newSessionId);
    } catch (error: any) {
      setError(error.message || "Failed to create game session");
    } finally {
      setLoading(false);
    }
  };

  const handleJoinSession = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      await joinGameSession(sessionId);
    } catch (error: any) {
      setError(error.message || "Failed to join game session");
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(
      `${window.location.origin}/join/${createdSessionId}`
    );
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const shareViaWhatsApp = () => {
    const url = `https://wa.me/?text=Join%20my%20Globetrotter %20game!%20${encodeURIComponent(
      `${window.location.origin}/join/${createdSessionId}`
    )}`;
    window.open(url, "_blank");
  };

  return (
    <Card className="w-full max-w-md mx-auto bg-[#1a1b26]/80 backdrop-blur-sm border-2 border-purple-500/20">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-center text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500">
          Multiplayer Mode
        </CardTitle>
        <CardDescription className="text-center text-gray-400">
          Create a new game or join an existing one
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="create" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-6">
            <TabsTrigger value="create">Create Game</TabsTrigger>
            <TabsTrigger value="join">Join Game</TabsTrigger>
          </TabsList>

          {error && (
            <Alert variant="destructive" className="mb-4">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          <TabsContent value="create">
            {createdSessionId ? (
              <div className="space-y-4">
                <div className="p-4 bg-purple-500/10 rounded-lg border border-purple-500/20">
                  <p className="text-sm text-gray-300 mb-2">
                    Share this link with your friends:
                  </p>
                  <div className="flex items-center">
                    <Input
                      value={`${window.location.origin}/join/${createdSessionId}`}
                      readOnly
                      className="bg-[#1a1b26] border-purple-500/20"
                    />
                    <Button
                      variant="ghost"
                      size="sm"
                      className="ml-2"
                      onClick={copyToClipboard}
                    >
                      <Copy className="h-4 w-4" />
                    </Button>
                  </div>
                  {copied && (
                    <p className="text-xs text-green-400 mt-1">
                      Copied to clipboard!
                    </p>
                  )}
                </div>

                <div className="flex flex-col space-y-2">
                  <Button
                    onClick={shareViaWhatsApp}
                    className="w-full bg-[#25D366] hover:bg-[#128C7E] text-white"
                  >
                    <Share2 className="h-4 w-4 mr-2" />
                    Share via WhatsApp
                  </Button>

                  <Button
                    onClick={() => setCreatedSessionId("")}
                    variant="outline"
                    className="w-full border-purple-500/20 hover:bg-purple-500/10"
                  >
                    Create Another Game
                  </Button>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                <p className="text-sm text-gray-300">
                  Create a new multiplayer game session that your friends can
                  join.
                </p>

                <Button
                  onClick={handleCreateSession}
                  className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
                  disabled={loading}
                >
                  <Users className="h-4 w-4 mr-2" />
                  {loading ? "Creating..." : "Create New Game"}
                </Button>
              </div>
            )}
          </TabsContent>

          <TabsContent value="join">
            <form onSubmit={handleJoinSession} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="session-id">Game Session ID</Label>
                <Input
                  id="session-id"
                  placeholder="Enter the game session ID"
                  value={sessionId}
                  onChange={(e) => setSessionId(e.target.value)}
                  className="bg-[#1a1b26] border-purple-500/20"
                  required
                />
              </div>

              <Button
                type="submit"
                className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
                disabled={loading}
              >
                {loading ? "Joining..." : "Join Game"}
              </Button>
            </form>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default GameSessionManager;
