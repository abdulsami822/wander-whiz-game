import React, { Suspense } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { GameProvider } from "@/contexts/GameContext";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

// Lazy load pages
const Home = React.lazy(() => import("@/pages/Index"));
const Game = React.lazy(() => import("@/pages/Game"));
const About = React.lazy(() => import("@/pages/About"));
const NotFound = React.lazy(() => import("@/pages/NotFound"));

// Loading component
const PageLoader = () => (
  <div className="flex items-center justify-center min-h-[60vh]">
    <div className="w-8 h-8 border-4 border-purple-500 border-t-transparent rounded-full animate-spin"></div>
  </div>
);

// Layout component to wrap pages with Navbar and Footer
const PageLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="min-h-screen relative">
      <Navbar />
      <main className="flex-grow">
        <Suspense fallback={<PageLoader />}>{children}</Suspense>
      </main>
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
          <Route
            path="/about"
            element={
              <PageLayout>
                <About />
              </PageLayout>
            }
          />
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
