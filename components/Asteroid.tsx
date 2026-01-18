import React from 'react';

interface AsteroidProps {
  progress: number; // 0 to 100
  color: string;
}

export const Asteroid: React.FC<AsteroidProps> = ({ progress, color }) => {
  return (
    <div 
      className="absolute left-1/2 -translate-x-1/2 w-16 h-16 pointer-events-none transition-transform duration-100 ease-linear z-10"
      style={{ 
        top: `${progress}%`,
        transform: `translate(-50%, -50%) rotate(${progress * 5}deg)`
      }}
    >
      <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path 
          d="M23.18 43.5C21.6 40.5 10.5 30.5 15.5 15.5C20.5 0.5 45.5 5.5 55.5 0.5C65.5 -4.5 85.5 10.5 90.5 25.5C95.5 40.5 80.5 55.5 85.5 70.5C90.5 85.5 70.5 95.5 55.5 90.5C40.5 85.5 15.5 90.5 5.5 75.5C-4.5 60.5 24.76 46.5 23.18 43.5Z" 
          fill="#475569" 
          stroke={color} 
          strokeWidth="3"
        />
        <circle cx="35" cy="35" r="5" fill="#334155" />
        <circle cx="65" cy="65" r="8" fill="#334155" />
        <path d="M70 20 L80 30" stroke="#334155" strokeWidth="2" />
        {/* Fire trail effect if moving fast, could add conditional rendering here */}
      </svg>
      {/* Visual Indicator of danger zone */}
      {progress > 80 && (
        <div className="absolute -inset-2 bg-red-500/30 rounded-full blur-xl animate-pulse"></div>
      )}
    </div>
  );
};