import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Question, PlayerState } from '../types';
import { Asteroid } from './Asteroid';
import { MAX_LIVES, QUESTIONS_TO_WIN, BASE_ASTEROID_SPEED, SPEED_INCREMENT } from '../constants';

interface PlayerZoneProps {
  playerId: number;
  questions: Question[];
  isActive: boolean;
  onStateUpdate: (state: PlayerState) => void;
  accentColor: string;
}

export const PlayerZone: React.FC<PlayerZoneProps> = ({ 
  playerId, 
  questions, 
  isActive, 
  onStateUpdate,
  accentColor 
}) => {
  // Game State
  const [lives, setLives] = useState(MAX_LIVES);
  const [score, setScore] = useState(0);
  const [currentQIndex, setCurrentQIndex] = useState(0);
  const [asteroidProgress, setAsteroidProgress] = useState(0);
  const [feedback, setFeedback] = useState<'HIT' | 'MISS' | 'CRASH' | null>(null);

  const lastTimeRef = useRef<number>(0);
  const requestRef = useRef<number>();
  
  // Derived state
  const isAlive = lives > 0;
  const hasFinished = currentQIndex >= QUESTIONS_TO_WIN;
  const currentQuestion = questions[currentQIndex];

  // Notify parent of state changes
  useEffect(() => {
    onStateUpdate({
      lives,
      score,
      currentQuestionIndex: currentQIndex,
      isAlive,
      hasFinished
    });
  }, [lives, score, currentQIndex, isAlive, hasFinished, onStateUpdate]);

  // Difficulty scaling
  const getSpeed = useCallback(() => {
    const difficultyLevel = Math.floor(currentQIndex / 3);
    return BASE_ASTEROID_SPEED + (difficultyLevel * SPEED_INCREMENT);
  }, [currentQIndex]);

  // Game Loop
  const animate = useCallback((time: number) => {
    if (!isActive || !isAlive || hasFinished) {
      lastTimeRef.current = time;
      requestRef.current = requestAnimationFrame(animate);
      return;
    }

    if (lastTimeRef.current !== 0) {
      const deltaTime = (time - lastTimeRef.current) / 1000; // seconds
      const speed = getSpeed(); // % per second
      
      setAsteroidProgress(prev => {
        const next = prev + (speed * deltaTime);
        if (next >= 100) {
          // Crash!
          setLives(l => l - 1);
          setFeedback('CRASH');
          setTimeout(() => setFeedback(null), 1000);
          
          setCurrentQIndex(q => q + 1);
          return 0; 
        }
        return next;
      });
    }
    
    lastTimeRef.current = time;
    requestRef.current = requestAnimationFrame(animate);
  }, [isActive, isAlive, hasFinished, getSpeed]);

  useEffect(() => {
    requestRef.current = requestAnimationFrame(animate);
    return () => {
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
    };
  }, [animate]);

  const handleAnswer = (option: string) => {
    if (!isActive || !isAlive || hasFinished || feedback) return;

    if (option === currentQuestion.correctAnswer) {
      // Correct
      const points = Math.max(10, Math.floor(100 - asteroidProgress) * 10);
      setScore(s => s + points);
      setAsteroidProgress(0); // Reset timer
      setCurrentQIndex(prev => prev + 1);
      setFeedback('HIT');
    } else {
      // Wrong
      // Penalty: Asteroid drops 20%
      setAsteroidProgress(prev => Math.min(99, prev + 20));
      setFeedback('MISS');
    }
    setTimeout(() => setFeedback(null), 500);
  };

  // Render Helpers
  const borderClass = playerId === 1 ? 'border-cyan-500' : 'border-rose-500';
  const textClass = playerId === 1 ? 'text-cyan-400' : 'text-rose-400';
  const bgClass = playerId === 1 ? 'bg-cyan-950/30' : 'bg-rose-950/30';
  const buttonHover = playerId === 1 ? 'hover:bg-cyan-500 hover:text-white' : 'hover:bg-rose-500 hover:text-white';

  if (!currentQuestion && !hasFinished) return <div className="text-white">Memuat...</div>;

  return (
    <div className={`relative flex flex-col h-full w-full border-4 ${borderClass} overflow-hidden bg-slate-900/80`}>
      
      {/* Header Stats */}
      <div className="flex justify-between items-center p-4 bg-black/40 backdrop-blur-sm z-20 border-b border-white/10">
        <div className="flex gap-1">
          {[...Array(MAX_LIVES)].map((_, i) => (
            <span key={i} className={`text-2xl ${i < lives ? 'opacity-100' : 'opacity-20 grayscale'}`}>
              ❤️
            </span>
          ))}
        </div>
        <div className={`font-display text-3xl font-bold ${textClass}`}>
          {score.toLocaleString()}
        </div>
      </div>

      {/* Main Game Area */}
      <div className="flex-1 relative flex flex-col z-10">
        
        {/* Asteroid Lane */}
        <div className="absolute inset-0 pointer-events-none opacity-50">
           {/* Grid lines for depth */}
           <div className="w-full h-full" 
                style={{ 
                  backgroundImage: `linear-gradient(${accentColor}33 1px, transparent 1px), linear-gradient(90deg, ${accentColor}33 1px, transparent 1px)`,
                  backgroundSize: '40px 40px',
                  perspective: '500px'
                }}>
           </div>
        </div>

        {/* The Falling Asteroid */}
        {!hasFinished && isAlive && (
          <Asteroid progress={asteroidProgress} color={accentColor} />
        )}

        {/* Feedback Overlay */}
        {feedback && (
          <div className="absolute inset-0 flex items-center justify-center z-50 bg-black/60 backdrop-blur-sm animate-pulse">
            <h2 className={`text-6xl font-black font-display tracking-widest uppercase ${
              feedback === 'HIT' ? 'text-green-500' : 'text-red-500'
            }`}>
              {feedback === 'CRASH' ? 'TABRAKAN!' : feedback === 'HIT' ? 'BAGUS!' : 'SALAH!'}
            </h2>
          </div>
        )}

        {/* Question Area - Positioned at bottom to "defend" the station */}
        <div className="mt-auto p-6 z-30 pb-10">
            {hasFinished ? (
              <div className="text-center py-20">
                <h2 className="text-4xl text-green-400 font-bold mb-4 animate-bounce">MISI SELESAI</h2>
                <p className="text-white/70">Menunggu lawan...</p>
              </div>
            ) : isAlive ? (
              <div className="space-y-4">
                <div className={`p-4 rounded-lg border bg-black/80 backdrop-blur ${borderClass}`}>
                  <p className="text-xl text-white font-medium text-center leading-tight">
                    {currentQuestion.text}
                  </p>
                </div>
                
                <div className="grid grid-cols-2 gap-3">
                  {currentQuestion.options.map((opt, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleAnswer(opt)}
                      className={`
                        p-4 rounded-lg border-2 border-white/10 bg-slate-800/90 text-white font-bold text-lg
                        transition-all duration-100 active:scale-95
                        ${buttonHover}
                        ${feedback ? 'pointer-events-none opacity-50' : ''}
                      `}
                    >
                      {opt}
                    </button>
                  ))}
                </div>
              </div>
            ) : (
              <div className="text-center py-20">
                <h2 className="text-4xl text-red-500 font-bold mb-2">KEGAGALAN SISTEM</h2>
                <p className="text-white/50">Stasiun Hancur</p>
              </div>
            )}
        </div>
      </div>

      {/* Base Station Indicator */}
      <div className={`h-4 w-full ${playerId === 1 ? 'bg-cyan-600' : 'bg-rose-600'} shadow-[0_-4px_20px_rgba(0,0,0,0.5)] z-20`}></div>
    </div>
  );
};