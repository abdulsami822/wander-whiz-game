import React, { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LogOut, User, Trophy, MapPin } from "lucide-react";

type Profile = {
  id: string;
  username: string;
  email: string;
  avatar_url?: string;
  total_games: number;
  high_score: number;
};

export const UserProfile: React.FC = () => {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const { data: sessionData } = await supabase.auth.getSession();
        const user = sessionData.session?.user;

        if (!user) return;

        const { data, error } = await supabase
          .from("profiles")
          .select("*")
          .eq("id", user.id)
          .single();

        if (error) throw error;

        setProfile(data);
      } catch (error) {
        console.error("Error fetching profile:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();

    // Listen for auth changes
    const { data: authListener } = supabase.auth.onAuthStateChange(
      (event, session) => {
        if (event === "SIGNED_IN") {
          fetchProfile();
        } else if (event === "SIGNED_OUT") {
          setProfile(null);
        }
      }
    );

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);

  const handleSignOut = async () => {
    await supabase.auth.signOut();
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center p-4">
        <div className="animate-pulse">Loading profile...</div>
      </div>
    );
  }

  if (!profile) {
    return null;
  }

  const getInitials = (username: string) => {
    return username.substring(0, 2).toUpperCase();
  };

  return (
    <Card className="bg-[#1a1b26]/80 backdrop-blur-sm border-2 border-purple-500/20">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-lg font-medium">Your Profile</CardTitle>
        <Button
          variant="ghost"
          size="sm"
          onClick={handleSignOut}
          className="text-gray-400 hover:text-red-400"
        >
          <LogOut className="h-4 w-4 mr-2" />
          Sign Out
        </Button>
      </CardHeader>
      <CardContent>
        <div className="flex items-center space-x-4">
          <Avatar className="h-12 w-12 border-2 border-purple-500/30">
            <AvatarImage src={profile.avatar_url} />
            <AvatarFallback className="bg-gradient-to-r from-purple-500 to-pink-500 text-white">
              {getInitials(profile.username)}
            </AvatarFallback>
          </Avatar>
          <div>
            <div className="font-medium text-lg">{profile.username}</div>
            <div className="text-sm text-gray-400">{profile.email}</div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 mt-6">
          <div className="flex items-center space-x-2 bg-purple-500/10 p-3 rounded-lg">
            <Trophy className="h-5 w-5 text-purple-400" />
            <div>
              <div className="text-sm text-gray-400">High Score</div>
              <div className="font-medium">{profile.high_score || 0}</div>
            </div>
          </div>
          <div className="flex items-center space-x-2 bg-pink-500/10 p-3 rounded-lg">
            <MapPin className="h-5 w-5 text-pink-400" />
            <div>
              <div className="text-sm text-gray-400">Games Played</div>
              <div className="font-medium">{profile.total_games || 0}</div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default UserProfile;
