
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
    <Card className={`overflow-hidden shadow-lg transition-all duration-300 
      hover:shadow-xl bg-gradient-to-br from-white/80 via-white/90 to-white/70
      dark:from-slate-800/90 dark:via-slate-800/95 dark:to-slate-800/80
      border-2 border-primary/10 backdrop-blur-lg ${className}`}>
      
      {title && (
        <CardHeader className="pb-2 relative overflow-hidden">
          <div className="absolute inset-0 bg-primary/5 blur-xl"></div>
          <CardTitle className="text-center relative z-10 font-bold tracking-wide">
            {title}
          </CardTitle>
        </CardHeader>
      )}
      
      <CardContent className="p-6 relative z-10">
        {children}
      </CardContent>
      
      {footer && (
        <CardFooter className="bg-secondary/70 backdrop-blur-sm px-6 py-4 border-t border-primary/10">
          {footer}
        </CardFooter>
      )}
    </Card>
  );
};

export default GameCard;
