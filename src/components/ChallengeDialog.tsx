import React, { useRef, useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { MessageSquare } from "lucide-react";
import { UsernameRegistration } from "@/components/UsernameRegistration";
import { useGameContext } from "@/contexts/GameContext";
import html2canvas from "html2canvas";
import confetti from "canvas-confetti";

// Remove Supabase import
// import { supabase } from "@/lib/supabase";

interface ChallengeDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function ChallengeDialog({ open, onOpenChange }: ChallengeDialogProps) {
  const { state, setUsername, generateChallengeUrl } = useGameContext();
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [isSharing, setIsSharing] = useState(false);
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

  // Upload image to Imgur
  const uploadImageToImgur = async (dataUrl: string): Promise<string> => {
    try {
      // Convert data URL to blob
      const response = await fetch(dataUrl);
      const blob = await response.blob();

      // Create FormData
      const formData = new FormData();
      formData.append("image", blob);

      // Upload to Imgur API
      const imgurResponse = await fetch("https://api.imgur.com/3/image", {
        method: "POST",
        headers: {
          Authorization: "Client-ID ecb71088d0c1854", // Replace with your Imgur Client ID
        },
        body: formData,
      });

      if (!imgurResponse.ok) {
        throw new Error("Failed to upload image to Imgur");
      }

      const imgurData = await imgurResponse.json();

      // Return the URL of the uploaded image
      return imgurData.data.link;
    } catch (error) {
      console.error("Error uploading image to Imgur:", error);
      // Return the data URL as fallback if upload fails
      return dataUrl;
    }
  };
  // Updated WhatsApp sharing function to share image directly when possible
  const shareToWhatsApp = async () => {
    if (!imageUrl) return;

    try {
      setIsSharing(true);

      // Generate challenge URL
      const challengeUrl = generateChallengeUrl();

      // Create message text
      const text = `I scored ${state.score} points in WanderWhiz ! Can you beat me? Play here: ${challengeUrl}`;

      // For mobile devices, we can use the Web Share API with file sharing if available
      if (navigator.share) {
        try {
          // Convert data URL to blob
          const response = await fetch(imageUrl);
          const blob = await response.blob();

          // Create a File object from the blob
          const file = new File(
            [blob],
            `wanderwhiz -challenge-${state.username}.png`,
            {
              type: "image/png",
            }
          );

          // Try to share with both text and file
          await navigator.share({
            title: "WanderWhiz  Challenge",
            text: text,
            url: challengeUrl,
            files: [file],
          });
          return;
        } catch (error) {
          console.error("Error sharing via Web Share API with files:", error);

          // If sharing with files fails, try without files (fallback)
          try {
            await navigator.share({
              title: "WanderWhiz  Challenge",
              text: text,
              url: challengeUrl,
            });
            return;
          } catch (fallbackError) {
            console.error(
              "Error sharing via Web Share API fallback:",
              fallbackError
            );
            // Continue to WhatsApp fallback
          }
        }
      }

      // If Web Share API is not available or fails, fall back to Imgur upload
      const publicImageUrl = await uploadImageToImgur(imageUrl);

      // Regular WhatsApp sharing with text and image URL
      const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(
        text + "\n\nSee my challenge card: " + publicImageUrl
      )}`;
      window.open(whatsappUrl, "_blank");
    } catch (error) {
      console.error("Error in shareToWhatsApp:", error);
      alert("There was an error sharing your challenge. Please try again.");
    } finally {
      setIsSharing(false);
    }
  };
  console.log(state.username, "userr");

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
                <div className="flex gap-2 flex-col">
                  <Button
                    onClick={shareToWhatsApp}
                    className="gap-2 bg-green-600 hover:bg-green-700"
                    disabled={isSharing}
                  >
                    <MessageSquare className="h-4 w-4" />
                    {isSharing ? "Preparing Share..." : "Share on WhatsApp"}
                  </Button>
                  <p className="text-xs text-center text-muted-foreground mt-2">
                    Your challenge card will be uploaded and shared
                    automatically
                  </p>
                </div>
              </div>
            )}
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
