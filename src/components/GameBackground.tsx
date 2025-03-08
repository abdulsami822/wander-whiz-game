
import React from 'react';

const GameBackground: React.FC = () => {
  return (
    <div className="background-moving">
      <div className="moving-clouds" />
      
      {/* Add some hot air balloons */}
      {[...Array(6)].map((_, i) => (
        <div 
          key={i}
          className="balloon"
          style={{
            backgroundColor: [
              '#FF70A6', '#FFE66D', '#4DEEEA', '#A239EA', '#A8F65F', '#FF9E43'
            ][i % 6],
            left: `${10 + i * 15}%`,
            animationDuration: `${15 + i * 2}s`,
            animationDelay: `${i * 2}s`
          }}
        >
          <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-6 h-6 bg-white/80 rounded-full" />
        </div>
      ))}
      
      {/* Flying Plane */}
      <div className="absolute top-[20%] left-0 z-10 animate-plane-fly">
        <div className="relative">
          <div className="w-16 h-4 bg-white rounded-full" />
          <div className="absolute top-1/2 left-1/2 w-6 h-6 bg-game-neon-blue rounded-full transform -translate-x-1/2 -translate-y-1/2" />
          <div className="absolute top-0 left-1/2 w-10 h-2 bg-game-neon-blue transform -translate-x-1/2 -translate-y-1/2 rotate-45" />
          <div className="absolute bottom-0 left-1/2 w-10 h-2 bg-game-neon-blue transform -translate-x-1/2 translate-y-1/2 -rotate-45" />
        </div>
      </div>
      
      {/* Mascot - Globe with Face */}
      <div className="absolute bottom-16 right-16 hidden lg:block">
        <div className="relative w-20 h-20 bg-game-neon-blue rounded-full flex items-center justify-center animate-bounce">
          <div className="w-16 h-16 bg-game-aqua rounded-full overflow-hidden">
            <div className="absolute w-8 h-8 bg-game-lime-green rounded-full left-3 top-4" />
            <div className="absolute w-4 h-4 bg-game-vibrant-pink rounded-full right-4 top-5" />
            <div className="absolute w-10 h-2 bg-white rounded-full bottom-4 left-1/2 transform -translate-x-1/2" style={{borderRadius: '0 0 10px 10px'}} />
          </div>
          <div className="absolute w-5 h-5 bg-black rounded-full left-5 top-4 flex items-center justify-center">
            <div className="w-2 h-2 bg-white rounded-full" />
          </div>
          <div className="absolute w-5 h-5 bg-black rounded-full right-5 top-4 flex items-center justify-center">
            <div className="w-2 h-2 bg-white rounded-full" />
          </div>
          <div className="absolute w-6 h-12 bg-transparent border-r-2 border-white right-[-12px] top-4 mascot-wave" />
        </div>
      </div>
    </div>
  );
};

export default GameBackground;
