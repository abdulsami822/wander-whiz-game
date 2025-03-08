import React, { useRef, useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Share, MessageSquare } from "lucide-react";
import { UsernameRegistration } from "@/components/UsernameRegistration";
import { useGameContext } from "@/contexts/GameContext";
import html2canvas from "html2canvas";
import confetti from "canvas-confetti";

interface ChallengeDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function ChallengeDialog({ open, onOpenChange }: ChallengeDialogProps) {
  const { state, setUsername, generateChallengeUrl } = useGameContext();
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const previewRef = useRef<HTMLDivElement>(null);
  const [usernameJustSet, setUsernameJustSet] = useState(false);

  // Reset state when dialog opens
  useEffect(() => {
    if (open) {
      if (!state.username) {
        setImageUrl(null);
        setIsGenerating(false);
      }
    }
  }, [open, state.username]);

  // Auto-generate image when username is set and dialog is open
  useEffect(() => {
    if (open && state.username && !imageUrl && !isGenerating) {
      // Small delay to ensure the preview ref is ready
      const timer = setTimeout(() => {
        generateImage();
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [open, state.username, imageUrl, isGenerating]);

  const handleUsernameComplete = (username: string) => {
    console.log(username, "handleUsernameComplete");
    setUsername(username);
    setUsernameJustSet(true);
  };
  // Handle the case when username is just set
  useEffect(() => {
    if (usernameJustSet && state.username && !imageUrl && !isGenerating) {
      const timer = setTimeout(() => {
        generateImage();
      }, 500);
      setUsernameJustSet(false);
      return () => clearTimeout(timer);
    }
  }, [usernameJustSet, state.username, imageUrl, isGenerating]);
  const generateImage = async () => {
    if (!previewRef.current) return;
    try {
      setIsGenerating(true);
      // Wait a bit for the DOM to update
      await new Promise((resolve) => setTimeout(resolve, 100));
      const canvas = await html2canvas(previewRef.current, {
        backgroundColor: "#1a1a2e",
        scale: 2,
      });
      const dataUrl = canvas.toDataURL("image/png");
      setImageUrl(dataUrl);
      // Trigger confetti effect
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
      });
    } catch (error) {
      console.error("Error generating image:", error);
    } finally {
      setIsGenerating(false);
    }
  };
  const shareToWhatsApp = () => {
    const challengeUrl = generateChallengeUrl();
    const text = `I scored ${state.score} points in WanderWhiz! Can you beat me? Play here: ${challengeUrl}`;
    const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(text)}`;
    window.open(whatsappUrl, "_blank");
  };

  console.log(state.username, "userr");
  // Fix the conditional rendering in the return statement
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Challenge a Friend</DialogTitle>
          <DialogDescription>
            Share your score and challenge friends to beat it!
          </DialogDescription>
        </DialogHeader>

        {!state.username ? (
          <UsernameRegistration onComplete={handleUsernameComplete} />
        ) : (
          <div className="space-y-4">
            <div
              ref={previewRef}
              className="p-6 bg-gradient-to-br from-purple-900 to-indigo-900 rounded-lg text-white text-center"
            >
              <h3 className="text-xl font-bold mb-2">WanderWhiz Challenge</h3>
              <p className="text-lg mb-4">{state.username} scored</p>
              <div className="text-5xl font-bold mb-4">{state.score}</div>
              <p className="text-sm">Can you beat this score?</p>
            </div>
            {isGenerating && (
              <div className="text-center py-2">
                <p className="text-sm text-muted-foreground">
                  Generating challenge card...
                </p>
              </div>
            )}
            {imageUrl && (
              <div className="space-y-4">
                <div className="flex gap-2">
                  <Button onClick={shareToWhatsApp} className="flex-1 gap-2">
                    <MessageSquare className="h-4 w-4" />
                    Share on WhatsApp
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => {
                      navigator.clipboard.writeText(generateChallengeUrl());
                      alert("Link copied to clipboard!");
                    }}
                    className="gap-2"
                  >
                    <Share className="h-4 w-4" />
                    Copy Link
                  </Button>
                </div>
              </div>
            )}
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
