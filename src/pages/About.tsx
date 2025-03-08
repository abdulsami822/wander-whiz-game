
import React from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { ArrowRight, Globe, MapPin, BookOpen } from 'lucide-react';

const About = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-10 shadow-sm">
        <div className="container max-w-6xl mx-auto p-4 flex justify-between items-center">
          <Link to="/" className="text-2xl font-bold text-primary hover:opacity-80 transition-opacity">
            Globetrotter
          </Link>
          <div className="flex gap-4">
            <Link to="/game">
              <Button variant="ghost" size="sm">Play Game</Button>
            </Link>
            <Link to="/">
              <Button variant="ghost" size="sm">Home</Button>
            </Link>
          </div>
        </div>
      </header>
      
      <main className="flex-grow">
        <section className="py-16 px-6 bg-gradient-to-b from-blue-50 to-white dark:from-blue-900 dark:to-gray-900">
          <div className="container max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 animate-fade-in">About Globetrotter</h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 animate-fade-in animate-delay-100">
              The ultimate travel guessing game that combines entertainment with education about the world's most fascinating destinations.
            </p>
          </div>
        </section>
        
        <section className="py-16 px-6">
          <div className="container max-w-4xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-16">
              <div className="text-center animate-fade-in">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Globe className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Explore the World</h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Discover famous landmarks, hidden gems, and cultural wonders from all corners of the globe.
                </p>
              </div>
              
              <div className="text-center animate-fade-in animate-delay-100">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <MapPin className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Test Your Knowledge</h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Challenge yourself with cryptic clues and see how well you know the world's most famous destinations.
                </p>
              </div>
              
              <div className="text-center animate-fade-in animate-delay-200">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <BookOpen className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Learn As You Play</h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Discover fascinating facts and trivia about each location, whether you guess correctly or not.
                </p>
              </div>
            </div>
            
            <div className="bg-secondary rounded-lg p-8 animate-fade-in animate-delay-300">
              <h2 className="text-2xl font-bold mb-4">How To Play</h2>
              <ol className="space-y-4 text-lg mb-6">
                <li className="flex gap-3">
                  <span className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center font-bold">1</span>
                  <span>Read the clue about a mystery destination.</span>
                </li>
                <li className="flex gap-3">
                  <span className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center font-bold">2</span>
                  <span>Choose the correct city from the options provided.</span>
                </li>
                <li className="flex gap-3">
                  <span className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center font-bold">3</span>
                  <span>If you need help, you can reveal an additional clue (but you'll earn fewer points).</span>
                </li>
                <li className="flex gap-3">
                  <span className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center font-bold">4</span>
                  <span>Learn fascinating facts about each destination.</span>
                </li>
                <li className="flex gap-3">
                  <span className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center font-bold">5</span>
                  <span>Keep playing to improve your global knowledge and beat your high score!</span>
                </li>
              </ol>
              
              <div className="text-center">
                <Link to="/game">
                  <Button className="group">
                    Start Playing Now
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <footer className="py-8 bg-white border-t">
        <div className="container text-center text-gray-500 text-sm">
          <p>Globetrotter — The Ultimate Travel Guessing Game</p>
        </div>
      </footer>
    </div>
  );
};

export default About;
