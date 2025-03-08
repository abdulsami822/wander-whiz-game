import React, { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { User } from "@supabase/supabase-js";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  User as UserIcon,
  Trophy,
  MapPin,
  Save,
  LogOut,
  AlertCircle,
} from "lucide-react";

// Define a type for the profile data
interface ProfileData {
  id: string;
  username: string;
  email?: string;
  avatar_url?: string;
  high_score?: number;
  total_games?: number;
  updated_at?: string;
}

const Profile = () => {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<ProfileData | null>(null);
  const [username, setUsername] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);

  useEffect(() => {
    // Get the current user session
    const getUser = async () => {
      const { data } = await supabase.auth.getSession();
      setUser(data.session?.user || null);
    };

    getUser();

    // Listen for auth changes
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
    const fetchProfile = async () => {
      try {
        setLoading(true);

        if (!user) return;

        const { data, error } = await supabase
          .from("profiles")
          .select("*")
          .eq("id", user.id)
          .single();

        if (error) throw error;

        setProfile(data);
        setUsername(data.username || "");
      } catch (error: unknown) {
        const errorMessage =
          error instanceof Error ? error.message : "Unknown error occurred";
        console.error("Error fetching profile:", errorMessage);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [user]);

  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError(null);
    setMessage(null);

    try {
      if (!user) throw new Error("No user logged in");

      const updates: ProfileData = {
        id: user.id,
        username,
        updated_at: new Date().toISOString(),
      };

      const { error } = await supabase.from("profiles").upsert(updates);

      if (error) throw error;

      setMessage("Profile updated successfully!");
    } catch (error: unknown) {
      const errorMessage =
        error instanceof Error ? error.message : "Unknown error occurred";
      setError(errorMessage);
    } finally {
      setSaving(false);
    }
  };

  const handleSignOut = async () => {
    await supabase.auth.signOut();
  };

  const getInitials = (username: string) => {
    return username.substring(0, 2).toUpperCase();
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-[#2a2b36] to-[#1a1b26]">
        <div className="text-center space-y-4">
          <UserIcon className="w-16 h-16 mx-auto text-purple-400 animate-pulse" />
          <p className="text-xl text-gray-400">Loading profile...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#2a2b36] to-[#1a1b26] relative">
      <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]"></div>

      <div className="container max-w-4xl mx-auto p-6 relative z-10">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500">
            Your Profile
          </h1>
          <Button
            variant="ghost"
            onClick={handleSignOut}
            className="text-gray-400 hover:text-red-400"
          >
            <LogOut className="h-4 w-4 mr-2" />
            Sign Out
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-1">
            <Card className="bg-[#1a1b26]/80 backdrop-blur-sm border-2 border-purple-500/20">
              <CardHeader>
                <CardTitle className="text-lg font-medium">
                  Profile Summary
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col items-center space-y-4">
                  <Avatar className="h-24 w-24 border-2 border-purple-500/30">
                    <AvatarImage src={profile?.avatar_url} />
                    <AvatarFallback className="bg-gradient-to-r from-purple-500 to-pink-500 text-white text-xl">
                      {profile?.username ? getInitials(profile.username) : "??"}
                    </AvatarFallback>
                  </Avatar>
                  <div className="text-center">
                    <div className="font-medium text-xl">
                      {profile?.username}
                    </div>
                    <div className="text-sm text-gray-400">{user?.email}</div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 mt-6">
                  <div className="flex items-center space-x-2 bg-purple-500/10 p-3 rounded-lg">
                    <Trophy className="h-5 w-5 text-purple-400" />
                    <div>
                      <div className="text-sm text-gray-400">High Score</div>
                      <div className="font-medium">
                        {profile?.high_score || 0}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2 bg-pink-500/10 p-3 rounded-lg">
                    <MapPin className="h-5 w-5 text-pink-400" />
                    <div>
                      <div className="text-sm text-gray-400">Games Played</div>
                      <div className="font-medium">
                        {profile?.total_games || 0}
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="md:col-span-2">
            <Card className="bg-[#1a1b26]/80 backdrop-blur-sm border-2 border-purple-500/20">
              <CardHeader>
                <CardTitle className="text-lg font-medium">
                  Edit Profile
                </CardTitle>
              </CardHeader>
              <CardContent>
                {error && (
                  <Alert variant="destructive" className="mb-4">
                    <AlertCircle className="h-4 w-4" />
                    <AlertDescription>{error}</AlertDescription>
                  </Alert>
                )}

                {message && (
                  <Alert className="mb-4 bg-green-500/10 border-green-500/20 text-green-400">
                    <AlertDescription>{message}</AlertDescription>
                  </Alert>
                )}

                <form onSubmit={handleUpdateProfile} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="username">Username</Label>
                    <Input
                      id="username"
                      type="text"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      className="bg-[#1a1b26] border-purple-500/20"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      value={user?.email || ""}
                      disabled
                      className="bg-[#1a1b26] border-purple-500/20 opacity-70"
                    />
                    <p className="text-xs text-gray-400">
                      Email cannot be changed
                    </p>
                  </div>

                  <Button
                    type="submit"
                    className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
                    disabled={saving}
                  >
                    {saving ? (
                      <>Saving...</>
                    ) : (
                      <>
                        <Save className="h-4 w-4 mr-2" />
                        Save Changes
                      </>
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
