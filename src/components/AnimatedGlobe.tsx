
import React, { useEffect, useRef } from 'react';
import { useIsMobile } from '@/hooks/use-mobile';

const AnimatedGlobe: React.FC = () => {
  const canvasRef = useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile();

  return (
    <div className="relative w-full">
      <div ref={canvasRef} className="globe-container animate-float">
        <div className="absolute inset-0 rounded-full bg-blue-100 animate-pulse-light"></div>
        <div className="absolute inset-2 rounded-full bg-blue-50 bg-opacity-80 backdrop-blur-sm shadow-inner"></div>
        
        {/* Continent silhouettes (simplified) */}
        <div className="absolute inset-4 rounded-full overflow-hidden">
          <div className="absolute top-[25%] left-[25%] w-[15%] h-[15%] bg-blue-200 rounded-full"></div> {/* North America */}
          <div className="absolute top-[40%] left-[35%] w-[10%] h-[15%] bg-blue-200 rounded-full"></div> {/* South America */}
          <div className="absolute top-[30%] left-[50%] w-[12%] h-[10%] bg-blue-200 rounded-full"></div> {/* Europe */}
          <div className="absolute top-[35%] left-[60%] w-[18%] h-[17%] bg-blue-200 rounded-full"></div> {/* Asia */}
          <div className="absolute top-[45%] left-[55%] w-[15%] h-[12%] bg-blue-200 rounded-full"></div> {/* Africa */}
          <div className="absolute top-[60%] left-[70%] w-[12%] h-[8%] bg-blue-200 rounded-full"></div> {/* Australia */}
        </div>
        
        {/* Orbit rings */}
        <div className="absolute inset-0 border-2 border-blue-100 rounded-full opacity-30 transform -rotate-12"></div>
        <div className="absolute inset-8 border border-blue-200 rounded-full opacity-50 transform rotate-45"></div>
        
        {/* Flying plane */}
        <div className="absolute w-4 h-4 bg-white rounded-full shadow-lg top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <div className="absolute w-6 h-1 bg-blue-100 -left-6 top-1/2 transform -translate-y-1/2 rounded-l-full"></div>
        </div>
        
        {/* Subtle glow effect */}
        <div className="absolute inset-0 rounded-full bg-blue-400 opacity-10 filter blur-xl"></div>
      </div>
      
      {/* Animated dots around the globe */}
      <div className="absolute top-0 right-0 w-3 h-3 bg-blue-400 rounded-full animate-ping"></div>
      <div className="absolute bottom-1/4 left-1/4 w-2 h-2 bg-blue-300 rounded-full animate-ping animation-delay-300"></div>
      <div className="absolute top-1/3 right-1/3 w-2 h-2 bg-blue-200 rounded-full animate-ping animation-delay-500"></div>
    </div>
  );
};

export default AnimatedGlobe;
