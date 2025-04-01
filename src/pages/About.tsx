import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  Globe,
  MapPin,
  BookOpen,
  Trophy,
  Users,
  Star,
  Brain,
  Target,
  Sparkles,
} from "lucide-react";

const About = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="relative py-24 px-6 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-[#2a2b36] to-[#1a1b26] z-0">
            <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]"></div>
          </div>
          <div className="container max-w-4xl mx-auto text-center relative z-10">
            <div className="inline-block animate-float">
              <Globe className="w-16 h-16 mx-auto mb-6 text-purple-400" />
            </div>
            <h1 className="text-5xl md:text-6xl font-bold mb-6 animate-fade-in text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-500 to-red-500">
              About WanderWhiz
            </h1>
            <p className="text-xl md:text-2xl text-gray-400 mb-8 animate-fade-in animate-delay-100 max-w-2xl mx-auto">
              Embark on a virtual journey around the world, testing your
              knowledge and discovering fascinating places through an engaging
              guessing game.
            </p>
            <div className="flex flex-wrap justify-center gap-4 mb-8 animate-fade-in animate-delay-200">
              <div className="flex items-center gap-2 text-gray-400">
                <Users className="w-5 h-5 text-purple-400" />
                <span>1000+ Players</span>
              </div>
              <div className="flex items-center gap-2 text-gray-400">
                <MapPin className="w-5 h-5 text-pink-400" />
                <span>200+ Destinations</span>
              </div>
              <div className="flex items-center gap-2 text-gray-400">
                <Star className="w-5 h-5 text-red-400" />
                <span>4.9/5 Rating</span>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-20 px-6 bg-[#2a2b36]">
          <div className="container max-w-4xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
              {[
                {
                  title: "Global Adventure",
                  description:
                    "Journey through iconic landmarks, hidden gems, and cultural wonders across continents.",
                  icon: <Globe className="w-8 h-8" />,
                  gradient: "from-purple-500 to-purple-600",
                },
                {
                  title: "Brain Teaser",
                  description:
                    "Solve cryptic clues and challenge your geographical knowledge in an exciting way.",
                  icon: <Brain className="w-8 h-8" />,
                  gradient: "from-pink-500 to-purple-500",
                },
                {
                  title: "Learn & Discover",
                  description:
                    "Uncover fascinating facts and stories about each destination as you play.",
                  icon: <Sparkles className="w-8 h-8" />,
                  gradient: "from-red-500 to-pink-500",
                },
              ].map((feature, index) => (
                <div
                  key={index}
                  className="relative group animate-fade-in h-full"
                  style={{ animationDelay: `${index * 100 + 200}ms` }}
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl blur opacity-25 group-hover:opacity-100 transition duration-300"></div>
                  <div className="relative h-full bg-[#1a1b26] p-8 rounded-xl border-2 border-purple-500/20 hover:border-purple-500/50 transition-all duration-300 group-hover:transform group-hover:scale-[1.02] group-hover:shadow-[0_0_20px_rgba(168,85,247,0.3)] shadow-[0_0_15px_rgba(168,85,247,0.1)]">
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

            {/* Game Rules Section */}
            <div className="relative group animate-fade-in animate-delay-300">
              <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl blur opacity-25 group-hover:opacity-100 transition duration-300"></div>
              <div className="relative bg-[#1a1b26] p-8 md:p-12 rounded-xl border-2 border-purple-500/20">
                <div className="flex items-center gap-4 mb-8">
                  <Target className="w-10 h-10 text-purple-400" />
                  <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500">
                    How To Play
                  </h2>
                </div>
                <ol className="space-y-6 text-lg mb-8">
                  {[
                    {
                      text: "Read the mysterious clue about a fascinating destination.",
                      icon: <BookOpen className="w-6 h-6" />,
                    },
                    {
                      text: "Use your knowledge to pick the correct city from multiple options.",
                      icon: <Brain className="w-6 h-6" />,
                    },
                    {
                      text: "Need help? Reveal additional clues, but remember - fewer clues mean more points!",
                      icon: <Sparkles className="w-6 h-6" />,
                    },
                    {
                      text: "Discover intriguing facts about each location, whether you guess right or not.",
                      icon: <Globe className="w-6 h-6" />,
                    },
                    {
                      text: "Compete for high scores and become a master wanderwhiz!",
                      icon: <Trophy className="w-6 h-6" />,
                    },
                  ].map((step, index) => (
                    <li key={index} className="flex gap-4 items-start">
                      <span className="flex-shrink-0 w-10 h-10 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 text-white flex items-center justify-center font-bold">
                        {step.icon}
                      </span>
                      <span className="text-gray-400 mt-1">{step.text}</span>
                    </li>
                  ))}
                </ol>

                <div className="text-center pt-4">
                  <Link to="/game">
                    <Button
                      size="lg"
                      className="group px-8 py-6 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 transition-all duration-300 hover:scale-105 hover:shadow-[0_0_20px_rgba(168,85,247,0.3)] text-lg"
                    >
                      Begin Your Adventure
                      <ArrowRight className="ml-2 h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default About;
