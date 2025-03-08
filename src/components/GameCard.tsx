
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
    <Card className={`glass-card overflow-hidden ${className}`}>
      {title && (
        <CardHeader className="pb-2">
          <CardTitle className="text-center">{title}</CardTitle>
        </CardHeader>
      )}
      <CardContent className="p-6">
        {children}
      </CardContent>
      {footer && (
        <CardFooter className="bg-secondary bg-opacity-40 px-6 py-4">
          {footer}
        </CardFooter>
      )}
    </Card>
  );
};

export default GameCard;
