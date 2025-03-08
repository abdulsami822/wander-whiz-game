import React, { useState } from "react";
import { useGameContext } from "@/contexts/GameContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Settings as SettingsIcon, Save, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

const Settings = () => {
  const { state, setDifficulty, resetGame } = useGameContext();
  const [selectedDifficulties, setSelectedDifficulties] = useState<string[]>(
    state.difficulty
  );
  const [rounds, setRounds] = useState(10);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [animationsEnabled, setAnimationsEnabled] = useState(true);
  const [theme, setTheme] = useState("dark");
  const [saved, setSaved] = useState(false);

  const handleDifficultyChange = (difficulty: string) => {
    setSelectedDifficulties((prev) => {
      if (prev.includes(difficulty)) {
        // Don't allow removing the last difficulty
        if (prev.length === 1) return prev;
        return prev.filter((d) => d !== difficulty);
      } else {
        return [...prev, difficulty];
      }
    });
  };

  const handleSaveSettings = () => {
    // Update game difficulty
    setDifficulty(selectedDifficulties as any);

    // Reset game with new settings
    resetGame({ difficulty: selectedDifficulties as any });

    // Show saved confirmation
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#2a2b36] to-[#1a1b26] relative">
      <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]"></div>

      <div className="container max-w-4xl mx-auto p-6 relative z-10">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500">
            Game Settings
          </h1>
          <Link to="/">
            <Button variant="ghost" className="text-gray-400">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Home
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="bg-[#1a1b26]/80 backdrop-blur-sm border-2 border-purple-500/20">
            <CardHeader>
              <CardTitle className="flex items-center text-lg font-medium">
                <SettingsIcon className="h-5 w-5 mr-2 text-purple-400" />
                Game Preferences
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <h3 className="text-sm font-medium text-gray-300">
                  Difficulty Levels
                </h3>
                <div className="grid grid-cols-3 gap-3">
                  <div
                    className={`p-3 rounded-lg border-2 cursor-pointer transition-all duration-200 ${
                      selectedDifficulties.includes("easy")
                        ? "border-green-500 bg-green-500/10"
                        : "border-gray-700 bg-gray-800/30"
                    }`}
                    onClick={() => handleDifficultyChange("easy")}
                  >
                    <div className="text-center">
                      <div
                        className={`font-medium ${
                          selectedDifficulties.includes("easy")
                            ? "text-green-400"
                            : "text-gray-400"
                        }`}
                      >
                        Easy
                      </div>
                    </div>
                  </div>
                  <div
                    className={`p-3 rounded-lg border-2 cursor-pointer transition-all duration-200 ${
                      selectedDifficulties.includes("medium")
                        ? "border-yellow-500 bg-yellow-500/10"
                        : "border-gray-700 bg-gray-800/30"
                    }`}
                    onClick={() => handleDifficultyChange("medium")}
                  >
                    <div className="text-center">
                      <div
                        className={`font-medium ${
                          selectedDifficulties.includes("medium")
                            ? "text-yellow-400"
                            : "text-gray-400"
                        }`}
                      >
                        Medium
                      </div>
                    </div>
                  </div>
                  <div
                    className={`p-3 rounded-lg border-2 cursor-pointer transition-all duration-200 ${
                      selectedDifficulties.includes("hard")
                        ? "border-red-500 bg-red-500/10"
                        : "border-gray-700 bg-gray-800/30"
                    }`}
                    onClick={() => handleDifficultyChange("hard")}
                  >
                    <div className="text-center">
                      <div
                        className={`font-medium ${
                          selectedDifficulties.includes("hard")
                            ? "text-red-400"
                            : "text-gray-400"
                        }`}
                      >
                        Hard
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <Label
                    htmlFor="rounds"
                    className="text-sm font-medium text-gray-300"
                  >
                    Number of Rounds: {rounds}
                  </Label>
                </div>
                <Slider
                  id="rounds"
                  min={5}
                  max={20}
                  step={1}
                  value={[rounds]}
                  onValueChange={(value) => setRounds(value[0])}
                  className="py-4"
                />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-[#1a1b26]/80 backdrop-blur-sm border-2 border-purple-500/20">
            <CardHeader>
              <CardTitle className="flex items-center text-lg font-medium">
                <SettingsIcon className="h-5 w-5 mr-2 text-purple-400" />
                Interface Settings
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="sound" className="text-sm font-medium">
                    Sound Effects
                  </Label>
                  <p className="text-xs text-gray-400">
                    Enable game sounds and music
                  </p>
                </div>
                <Switch
                  id="sound"
                  checked={soundEnabled}
                  onCheckedChange={setSoundEnabled}
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="animations" className="text-sm font-medium">
                    Animations
                  </Label>
                  <p className="text-xs text-gray-400">
                    Enable UI animations and transitions
                  </p>
                </div>
                <Switch
                  id="animations"
                  checked={animationsEnabled}
                  onCheckedChange={setAnimationsEnabled}
                />
              </div>

              <div className="space-y-3">
                <Label className="text-sm font-medium">Theme</Label>
                <RadioGroup
                  value={theme}
                  onValueChange={setTheme}
                  className="flex space-x-2"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="dark" id="dark" />
                    <Label htmlFor="dark" className="text-sm">
                      Dark
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="light" id="light" />
                    <Label htmlFor="light" className="text-sm">
                      Light
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="system" id="system" />
                    <Label htmlFor="system" className="text-sm">
                      System
                    </Label>
                  </div>
                </RadioGroup>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="mt-8 flex justify-end">
          <Button
            onClick={handleSaveSettings}
            className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
          >
            {saved ? (
              "Settings Saved!"
            ) : (
              <>
                <Save className="h-4 w-4 mr-2" />
                Save Settings
              </>
            )}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Settings;
