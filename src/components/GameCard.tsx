
import React from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';

interface GameCardProps {
  children: React.ReactNode;
  title?: string;
  footer?: React.ReactNode;
  className?: string;
}

const GameCard: React.FC<GameCardProps> = ({ children, title, footer, className = '' }) => {
  return (
    <Card className={`game-card ${className}`}>
      {title && (
        <CardHeader className="pb-2">
          <CardTitle className="text-center text-2xl text-game-electric-purple">{title}</CardTitle>
        </CardHeader>
      )}
      <CardContent className="p-6">
        {children}
      </CardContent>
      {footer && (
        <CardFooter className="bg-secondary/20 rounded-b-xl px-6 py-4 border-t-2 border-game-vibrant-pink/30">
          {footer}
        </CardFooter>
      )}
    </Card>
  );
};

export default GameCard;
