
import React from 'react';
import { Button } from '@/components/ui/button';
import AnimatedGlobe from '@/components/AnimatedGlobe';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Hero Section */}
      <section className="relative flex-grow flex items-center justify-center p-6 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-blue-50 to-white dark:from-blue-900 dark:to-gray-900 z-0"></div>
        
        <div className="container max-w-6xl mx-auto z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6 text-center md:text-left">
              <div>
                <div className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4 animate-fade-in">
                  Test your travel knowledge
                </div>
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight animate-fade-in animate-delay-100 mb-4">
                  <span className="text-shadow">Globetrotter</span>
                </h1>
                <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 animate-fade-in animate-delay-200">
                  The ultimate travel guessing game that takes you around the world.
                </p>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start animate-fade-in animate-delay-300">
                <Link to="/game">
                  <Button size="lg" className="group px-6 transition-all duration-300 hover:translate-y-[-5px] hover:shadow-lg">
                    Start Playing
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                  </Button>
                </Link>
                <Link to="/about">
                  <Button variant="outline" size="lg" className="transition-all duration-300 hover:translate-y-[-5px] hover:shadow-lg">
                    Learn More
                  </Button>
                </Link>
              </div>
            </div>
            
            <div className="flex justify-center md:justify-end animate-fade-in animate-delay-100">
              <div className="w-full max-w-md">
                <AnimatedGlobe />
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Features Section */}
      <section className="py-16 px-6 bg-secondary">
        <div className="container max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12 animate-fade-in">How to Play</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "Read the Clues",
                description: "You'll receive cryptic clues about a famous place. Use your knowledge to guess the destination."
              },
              {
                title: "Make Your Guess",
                description: "Select the correct city from the multiple-choice options. The fewer clues you need, the more points you earn!"
              },
              {
                title: "Discover & Learn",
                description: "Whether you guess correctly or not, you'll learn fascinating facts about destinations around the world."
              }
            ].map((feature, index) => (
              <div 
                key={index} 
                className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300 animate-fade-in"
                style={{ animationDelay: `${index * 100 + 200}ms` }}
              >
                <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
          
          <div className="text-center mt-12 animate-fade-in animate-delay-500">
            <Link to="/game">
              <Button size="lg" className="px-8">
                Start Your Journey
              </Button>
            </Link>
          </div>
        </div>
      </section>
      
      {/* Footer */}
      <footer className="py-8 bg-white border-t">
        <div className="container text-center text-gray-500 text-sm">
          <p>Globetrotter — The Ultimate Travel Guessing Game</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
