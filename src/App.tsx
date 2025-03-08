import React, { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { GameProvider } from "@/contexts/GameContext";
import { supabase } from "@/lib/supabase";
import { User } from "@supabase/supabase-js";
import Home from "@/pages/Index";
import Game from "@/pages/Game";
import JoinGame from "@/pages/JoinGame";
import Settings from "@/pages/Settings";
import Profile from "@/pages/Profile";
import NotFound from "@/pages/NotFound";
import About from "@/pages/About"; // Add About page import
import AuthForm from "@/components/Auth/AuthForm";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

// Protected route component
const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getUser = async () => {
      const { data } = await supabase.auth.getSession();
      setUser(data.session?.user || null);
      setLoading(false);
    };
    getUser();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-[#2a2b36] to-[#1a1b26]">
        <div className="animate-pulse text-purple-400">Loading...</div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
};

// Layout component to wrap pages with Navbar and Footer
const PageLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow">{children}</main>
      <Footer />
    </div>
  );
};

// Game layout without footer for better gameplay experience
const GameLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow">{children}</main>
    </div>
  );
};

function App() {
  useEffect(() => {
    // Check for session recovery
    const { data: authListener } = supabase.auth.onAuthStateChange(
      (event, session) => {
        // You could update a global state here if needed
        console.log("Auth state changed:", event);
      }
    );

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);

  return (
    <GameProvider>
      <Router>
        <Routes>
          <Route
            path="/"
            element={
              <PageLayout>
                <Home />
              </PageLayout>
            }
          />
          <Route
            path="/game"
            element={
              <GameLayout>
                <Game />
              </GameLayout>
            }
          />
          <Route
            path="/join/:sessionId"
            element={
              <GameLayout>
                <JoinGame />
              </GameLayout>
            }
          />
          <Route path="/login" element={<AuthForm />} />

          {/* Add About page route */}
          <Route
            path="/about"
            element={
              <PageLayout>
                <About />
              </PageLayout>
            }
          />

          {/* Protected routes */}
          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <PageLayout>
                  <Profile />
                </PageLayout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/settings"
            element={
              <ProtectedRoute>
                <PageLayout>
                  <Settings />
                </PageLayout>
              </ProtectedRoute>
            }
          />

          {/* 404 route */}
          <Route
            path="*"
            element={
              <PageLayout>
                <NotFound />
              </PageLayout>
            }
          />
        </Routes>
      </Router>
    </GameProvider>
  );
}

export default App;
