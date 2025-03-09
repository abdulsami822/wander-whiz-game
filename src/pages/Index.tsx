import React from "react";
import { Button } from "@/components/ui/button";
import AnimatedGlobe from "@/components/AnimatedGlobe";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  Globe2,
  Trophy,
  Users,
  MapPin,
  Star,
  Brain,
} from "lucide-react";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Hero Section */}
      <section className="relative min-h-[60vh] flex items-center justify-center p-6 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-[#2a2b36] to-[#1a1b26] z-0">
          <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]"></div>
        </div>

        <div className="container max-w-6xl mx-auto z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center py-12">
            <div className="space-y-8 text-center md:text-left">
              <div>
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-500/10 border border-purple-500/20 mb-6 animate-fade-in">
                  <Globe2 className="w-4 h-4 text-purple-400" />
                  <span className="text-sm text-purple-400">
                    Travel the World Virtually
                  </span>
                </div>
                <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight animate-fade-in animate-delay-100 mb-6">
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-500 to-red-500">
                    Globetrotter
                  </span>
                </h1>
                <p className="text-xl md:text-2xl text-gray-400 animate-fade-in animate-delay-200">
                  Embark on an exciting journey around the world. Test your
                  knowledge, discover new places, and become a master traveler!
                </p>
              </div>

              <div className="flex flex-wrap gap-6 justify-center md:justify-start animate-fade-in animate-delay-200">
                <div className="flex items-center gap-2">
                  <Users className="w-5 h-5 text-purple-400" />
                  <span className="text-gray-400">1000+ Players</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-pink-400" />
                  <span className="text-gray-400">200+ Destinations</span>
                </div>
                <div className="flex items-center gap-2">
                  <Star className="w-5 h-5 text-red-400" />
                  <span className="text-gray-400">4.9/5 Rating</span>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start animate-fade-in animate-delay-300">
                <Link to="/game">
                  <Button
                    size="lg"
                    className="group px-8 py-6 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 transition-all duration-300 hover:scale-105 hover:shadow-[0_0_15px_rgba(168,85,247,0.5)] text-lg w-full sm:w-auto"
                  >
                    Start Playing
                    <ArrowRight className="ml-2 h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
                  </Button>
                </Link>
                <Link to="/about">
                  <Button
                    variant="outline"
                    size="lg"
                    className="px-8 py-6 border-2 border-purple-500/50 hover:border-purple-500 hover:bg-purple-500/10 transition-all duration-300 hover:scale-105 text-lg w-full sm:w-auto"
                  >
                    Learn More
                  </Button>
                </Link>
              </div>
            </div>

            <div className="mt-16 sm:mt-0 flex justify-center md:justify-end animate-fade-in animate-delay-100">
              <div className="w-full max-w-md relative">
                <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full blur-3xl opacity-20 animate-pulse"></div>
                <div className="relative animate-float">
                  <AnimatedGlobe />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-6 bg-[#2a2b36]">
        <div className="container max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold animate-fade-in text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500 mb-4">
              How to Play
            </h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Challenge yourself with our engaging travel guessing game and
              explore the world
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "Read the Clues",
                description:
                  "Analyze cryptic clues about famous destinations. Each clue brings you closer to uncovering the mystery location.",
                gradient: "from-purple-500 to-purple-600",
                icon: <Brain className="w-8 h-8" />,
              },
              {
                title: "Make Your Guess",
                description:
                  "Choose wisely from multiple options. Quick, accurate guesses with fewer clues earn you more points!",
                gradient: "from-pink-500 to-purple-500",
                icon: <MapPin className="w-8 h-8" />,
              },
              {
                title: "Learn & Achieve",
                description:
                  "Discover fascinating facts about each location and climb the global leaderboard as you play.",
                gradient: "from-red-500 to-pink-500",
                icon: <Trophy className="w-8 h-8" />,
              },
            ].map((feature, index) => (
              <div
                key={index}
                className="relative group animate-fade-in h-full"
                style={{ animationDelay: `${index * 100 + 200}ms` }}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl blur opacity-25 group-hover:opacity-100 transition duration-300"></div>
                <div className="relative h-full bg-[#1a1b26] p-8 rounded-xl border-2 border-purple-500/20 hover:border-purple-500/50 transition-all duration-300 group-hover:transform group-hover:scale-[1.02] group-hover:shadow-[0_0_20px_rgba(168,85,247,0.3)]">
                  <div className="w-16 h-16 bg-purple-500/10 rounded-full flex items-center justify-center mb-4 text-purple-400">
                    {feature.icon}
                  </div>
                  <h3
                    className={`text-2xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r ${feature.gradient}`}
                  >
                    {feature.title}
                  </h3>
                  <p className="text-gray-400 leading-relaxed">
                    {feature.description}
                  </p>
                  <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-purple-500/10 to-transparent rounded-bl-[100px] pointer-events-none"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      {/* Why Play Section */}
      <section className="py-20 px-6 bg-[#1a1b26]">
        <div className="container max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold animate-fade-in text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500 mb-4">
              Why Play Globetrotter?
            </h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Experience the world's most fascinating destinations from your
              screen
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="relative group animate-fade-in">
              <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl blur opacity-25 group-hover:opacity-100 transition duration-300"></div>
              <div className="relative h-full bg-[#2a2b36] p-8 rounded-xl border-2 border-purple-500/20">
                <h3 className="text-2xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500">
                  Educational Journey
                </h3>
                <ul className="space-y-4">
                  {[
                    "Learn about world-famous landmarks and hidden gems",
                    "Discover cultural insights and historical facts",
                    "Improve your geography knowledge while having fun",
                    "Challenge yourself with increasingly difficult levels",
                  ].map((item, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <div className="flex-shrink-0 w-6 h-6 rounded-full bg-purple-500/10 flex items-center justify-center">
                        <div className="w-2 h-2 rounded-full bg-purple-400"></div>
                      </div>
                      <span className="text-gray-400">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="relative group animate-fade-in animate-delay-100">
              <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl blur opacity-25 group-hover:opacity-100 transition duration-300"></div>
              <div className="relative h-full bg-[#2a2b36] p-8 rounded-xl border-2 border-purple-500/20">
                <h3 className="text-2xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500">
                  Engaging Experience
                </h3>
                <ul className="space-y-4">
                  {[
                    "Compete with players worldwide on the leaderboard",
                    "Earn achievements and unlock special badges",
                    "Track your progress and improve your score",
                    "Share your victories with friends and challenge them",
                  ].map((item, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <div className="flex-shrink-0 w-6 h-6 rounded-full bg-purple-500/10 flex items-center justify-center">
                        <div className="w-2 h-2 rounded-full bg-purple-400"></div>
                      </div>
                      <span className="text-gray-400">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Community Stats Section */}
      <section className="py-20 px-6 bg-[#2a2b36] relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]"></div>
        <div className="container max-w-6xl mx-auto relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold animate-fade-in text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500 mb-4">
              Our Growing Community
            </h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Join thousands of travelers exploring the world through
              Globetrotter
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
            {[
              {
                number: "50K+",
                label: "Active Players",
                gradient: "from-purple-400 to-purple-600",
                icon: <Users className="w-6 h-6" />,
              },
              {
                number: "1M+",
                label: "Games Played",
                gradient: "from-pink-400 to-purple-400",
                icon: <Trophy className="w-6 h-6" />,
              },
              {
                number: "200+",
                label: "Destinations",
                gradient: "from-red-400 to-pink-400",
                icon: <MapPin className="w-6 h-6" />,
              },
              {
                number: "4.9",
                label: "User Rating",
                gradient: "from-orange-400 to-red-400",
                icon: <Star className="w-6 h-6" />,
              },
            ].map((stat, index) => (
              <div
                key={index}
                className="relative group animate-fade-in text-center"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl blur opacity-25 group-hover:opacity-100 transition duration-300"></div>
                <div className="relative bg-[#1a1b26] p-8 rounded-xl border-2 border-purple-500/20 hover:border-purple-500/50 transition-all duration-300 hover:scale-[1.02] hover:shadow-[0_0_20px_rgba(168,85,247,0.3)]">
                  <div className="w-16 h-16 bg-purple-500/10 rounded-full flex items-center justify-center mb-4 mx-auto text-purple-400">
                    {stat.icon}
                  </div>
                  <h3
                    className={`text-4xl font-bold mb-2 text-transparent bg-clip-text bg-gradient-to-r ${stat.gradient}`}
                  >
                    {stat.number}
                  </h3>
                  <p className="text-gray-400">{stat.label}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      {/* Testimonials Section */}
      <section className="py-20 px-6 bg-[#1a1b26]">
        <div className="container max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold animate-fade-in text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500 mb-4">
              What Players Say
            </h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Hear from our community of global explorers
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                quote:
                  "Globetrotter has completely transformed how I learn about new places. It's both fun and educational!",
                author: "Sarah K.",
                location: "United States",
                gradient: "from-purple-500 to-purple-600",
              },
              {
                quote:
                  "I've discovered so many fascinating places I never knew existed. Now I have a whole new travel bucket list!",
                author: "Miguel R.",
                location: "Spain",
                gradient: "from-pink-500 to-purple-500",
              },
              {
                quote:
                  "The perfect way to test your geography knowledge while learning interesting facts about world destinations.",
                author: "Aisha M.",
                location: "Singapore",
                gradient: "from-red-500 to-pink-500",
              },
            ].map((testimonial, index) => (
              <div
                key={index}
                className="relative group animate-fade-in h-full"
                style={{ animationDelay: `${index * 100 + 200}ms` }}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl blur opacity-25 group-hover:opacity-100 transition duration-300"></div>
                <div className="relative h-full bg-[#2a2b36] p-8 rounded-xl border-2 border-purple-500/20 hover:border-purple-500/50 transition-all duration-300 group-hover:transform group-hover:scale-[1.02] group-hover:shadow-[0_0_20px_rgba(168,85,247,0.3)]">
                  <div className="text-4xl text-purple-400 mb-4">"</div>
                  <p className="text-gray-400 leading-relaxed mb-6">
                    {testimonial.quote}
                  </p>
                  <div className="mt-auto">
                    <p
                      className={`font-bold text-transparent bg-clip-text bg-gradient-to-r ${testimonial.gradient}`}
                    >
                      {testimonial.author}
                    </p>
                    <p className="text-gray-500 text-sm">
                      {testimonial.location}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      {/* CTA Section */}
      <section className="py-20 px-6 bg-[#2a2b36] relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]"></div>
        <div className="container max-w-4xl mx-auto relative z-10 text-center">
          <h2 className="text-4xl md:text-5xl font-bold animate-fade-in text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 mb-6">
            Ready to Test Your Knowledge?
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto mb-10">
            Start your global adventure today and see how many destinations you
            can identify!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in animate-delay-200">
            <Link to="/game">
              <Button
                size="lg"
                className="group px-8 py-6 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 transition-all duration-300 hover:scale-105 hover:shadow-[0_0_20px_rgba(168,85,247,0.3)] text-lg w-full sm:w-auto"
              >
                Begin Your Adventure
                <ArrowRight className="ml-2 h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
              </Button>
            </Link>
            <Link to="/about">
              <Button
                variant="outline"
                size="lg"
                className="px-8 py-6 border-2 border-purple-500/50 hover:border-purple-500 hover:bg-purple-500/10 transition-all duration-300 hover:scale-105 text-lg w-full sm:w-auto"
              >
                Learn More
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
