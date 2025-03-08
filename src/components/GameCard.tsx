import React from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface GameCardProps {
  children: React.ReactNode;
  title?: string;
  footer?: React.ReactNode;
  className?: string;
}

const GameCard: React.FC<GameCardProps> = ({
  children,
  title,
  footer,
  className = "",
}) => {
  return (
    <Card
      className={`overflow-hidden shadow-lg transition-all duration-300 
      hover:shadow-xl bg-[#1a1b26]/80 backdrop-blur-sm
      border-2 border-purple-500/20 ${className}`}
    >
      {title && (
        <CardHeader className="pb-2 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-pink-500/10 blur-xl"></div>
          <CardTitle className="text-center relative z-10 font-bold tracking-wide text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500">
            {title}
          </CardTitle>
        </CardHeader>
      )}

      <CardContent className="p-6 relative z-10">{children}</CardContent>

      {footer && (
        <CardFooter className="bg-purple-500/5 backdrop-blur-sm px-6 py-4 border-t border-purple-500/10">
          {footer}
        </CardFooter>
      )}
    </Card>
  );
};

export default GameCard;
