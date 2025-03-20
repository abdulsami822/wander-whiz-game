import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { GameProvider } from "@/contexts/GameContext";

import Home from "@/pages/Index";
import Game from "@/pages/Game";
import NotFound from "@/pages/NotFound";
import About from "@/pages/About"; // Add About page import
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

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

function App() {
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
              <PageLayout>
                <Game />
              </PageLayout>
            }
          />

          {/* Add About page route */}
          <Route
            path="/about"
            element={
              <PageLayout>
                <About />
              </PageLayout>
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
