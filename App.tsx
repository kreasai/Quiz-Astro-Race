import React, { useState, useEffect, useCallback } from 'react';
import { PlayerZone } from './components/PlayerZone';
import { fetchQuestions } from './services/geminiService'; // Logic sekarang lokal
import { Question, GameStatus, PlayerState } from './types';

const App: React.FC = () => {
  const [status, setStatus] = useState<GameStatus>(GameStatus.IDLE);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [loadingText, setLoadingText] = useState("Menginisialisasi sistem...");
  const [isMobile, setIsMobile] = useState(false);

  const [p1State, setP1State] = useState<PlayerState | null>(null);
  const [p2State, setP2State] = useState<PlayerState | null>(null);

  // Check for mobile device on mount and resize
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Load questions
  const initializeGame = async () => {
    setStatus(GameStatus.LOADING);
    setLoadingText("Menyiapkan bank soal...");
    
    // Fetch random local questions
    const q = await fetchQuestions();
    
    setQuestions(q);
    
    setLoadingText("Sistem Siap.");
    setTimeout(() => {
      setStatus(GameStatus.PLAYING);
    }, 800);
  };

  const handleP1Update = useCallback((s: PlayerState) => setP1State(s), []);
  const handleP2Update = useCallback((s: PlayerState) => setP2State(s), []);

  // Check Game Over Conditions
  useEffect(() => {
    if (status !== GameStatus.PLAYING) return;
    if (!p1State || !p2State) return;

    // Condition 1: Someone died
    if (!p1State.isAlive) {
      endGame();
      return;
    }
    if (!p2State.isAlive) {
      endGame();
      return;
    }

    // Condition 2: Both finished
    if (p1State.hasFinished && p2State.hasFinished) {
      endGame();
      return;
    }
  }, [p1State, p2State, status]);

  const endGame = () => {
    setStatus(GameStatus.FINISHED);
  };

  const getWinner = () => {
    if (!p1State || !p2State) return null;

    // Death logic
    if (!p1State.isAlive && p2State.isAlive) return { id: 2, reason: "Stasiun Pemain 1 Hancur" };
    if (!p2State.isAlive && p1State.isAlive) return { id: 1, reason: "Stasiun Pemain 2 Hancur" };
    if (!p1State.isAlive && !p2State.isAlive) return { id: 0, reason: "Kehancuran Bersama" };

    // Score logic (both alive and finished)
    if (p1State.score > p2State.score) return { id: 1, reason: "Skor Tertinggi" };
    if (p2State.score > p1State.score) return { id: 2, reason: "Skor Tertinggi" };
    
    return { id: 0, reason: "Permainan Seri" };
  };

  // Mobile Block Screen
  if (isMobile) {
    return (
      <div className="w-full h-screen bg-slate-900 text-white flex flex-col items-center justify-center p-8 text-center">
        <div className="text-6xl mb-6">📱🚫</div>
        <h1 className="text-3xl font-display font-bold text-red-500 mb-4">PERANGKAT TIDAK DIDUKUNG</h1>
        <p className="text-slate-300">
          Maaf, game ini dirancang untuk layar besar.<br/>
          Silakan buka di Desktop, Laptop, atau Tablet dalam mode lanskap.
        </p>
        <div className="mt-12 text-xs text-slate-600 font-display">
           GAME BY KREASAI.COM
        </div>
      </div>
    );
  }

  return (
    <div className="w-full h-screen bg-black text-white overflow-hidden flex flex-col relative">
      {/* Background Stars/Effect */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute w-1 bg-white h-1 rounded-full top-10 left-20 animate-pulse"></div>
        <div className="absolute w-2 bg-blue-200 h-2 rounded-full top-1/4 left-3/4 opacity-50"></div>
        <div className="absolute w-1 bg-white h-1 rounded-full bottom-10 left-1/2"></div>
        <div className="w-full h-full bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-slate-900 via-[#0a0a1a] to-black"></div>
      </div>

      {status === GameStatus.IDLE && (
        <div className="relative z-10 flex flex-col items-center justify-center h-full space-y-8 animate-float">
          <h1 className="text-7xl md:text-9xl font-display font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-rose-500 tracking-tighter drop-shadow-[0_0_30px_rgba(255,255,255,0.2)]">
            ASTRO RACE
          </h1>
          <p className="text-xl md:text-2xl text-slate-400 font-light tracking-[0.5em] uppercase">BAHAYA ASTEROID</p>
          
          <button 
            onClick={initializeGame}
            className="group relative px-12 py-6 bg-transparent overflow-hidden rounded-none border border-white/20 transition-all hover:border-white/60"
          >
            <div className="absolute inset-0 w-0 bg-white transition-all duration-[250ms] ease-out group-hover:w-full opacity-10"></div>
            <span className="relative text-2xl font-bold font-display tracking-widest group-hover:text-white transition-colors">MULAI MISI</span>
          </button>
        </div>
      )}

      {status === GameStatus.LOADING && (
        <div className="relative z-10 flex flex-col items-center justify-center h-full">
          <div className="w-16 h-16 border-4 border-t-cyan-500 border-r-transparent border-b-rose-500 border-l-transparent rounded-full animate-spin mb-4"></div>
          <p className="text-cyan-400 font-mono text-lg animate-pulse">{loadingText}</p>
        </div>
      )}

      {status === GameStatus.PLAYING && (
        <div className="relative z-10 flex flex-row w-full h-full">
          {/* Player 1 - Left */}
          <div className="flex-1 h-full border-r border-slate-800">
             <PlayerZone 
                playerId={1} 
                questions={questions} 
                isActive={true}
                onStateUpdate={handleP1Update}
                accentColor="#06b6d4" // cyan-500
             />
          </div>

          {/* Center Divider/VS visual */}
          <div className="absolute left-1/2 top-0 bottom-0 w-1 -translate-x-1/2 z-50 bg-slate-800 flex flex-col items-center justify-center">
            <div className="bg-black border border-slate-700 rounded-full w-12 h-12 flex items-center justify-center text-xs font-bold text-slate-500">VS</div>
          </div>

          {/* Player 2 - Right */}
          <div className="flex-1 h-full border-l border-slate-800">
            <PlayerZone 
                playerId={2} 
                questions={questions} 
                isActive={true}
                onStateUpdate={handleP2Update}
                accentColor="#f43f5e" // rose-500
             />
          </div>
        </div>
      )}

      {status === GameStatus.FINISHED && (
        <div className="relative z-50 flex flex-col items-center justify-center h-full bg-black/90 backdrop-blur-xl animate-fade-in p-8">
          <h2 className="text-5xl font-display font-bold mb-8">LAPORAN MISI</h2>
          
          <div className="flex gap-12 items-end mb-12">
            {/* P1 Stats */}
            <div className={`text-center p-6 rounded-xl border-2 ${getWinner()?.id === 1 ? 'border-cyan-500 bg-cyan-950/40 scale-110 shadow-[0_0_50px_rgba(6,182,212,0.3)]' : 'border-slate-800 opacity-60'}`}>
              <h3 className="text-cyan-400 font-bold text-2xl mb-2">PEMAIN 1</h3>
              <div className="text-5xl font-mono font-bold mb-2">{p1State?.score}</div>
              <div className="text-sm text-slate-400">SKOR</div>
            </div>

            {/* P2 Stats */}
            <div className={`text-center p-6 rounded-xl border-2 ${getWinner()?.id === 2 ? 'border-rose-500 bg-rose-950/40 scale-110 shadow-[0_0_50px_rgba(244,63,94,0.3)]' : 'border-slate-800 opacity-60'}`}>
              <h3 className="text-rose-400 font-bold text-2xl mb-2">PEMAIN 2</h3>
              <div className="text-5xl font-mono font-bold mb-2">{p2State?.score}</div>
              <div className="text-sm text-slate-400">SKOR</div>
            </div>
          </div>

          <div className="text-center mb-12">
            <p className="text-slate-500 uppercase tracking-widest text-sm mb-2">HASIL</p>
            <h1 className="text-6xl font-black italic text-white mb-2">
              {getWinner()?.id === 0 ? "SERI" : `PEMAIN ${getWinner()?.id} MENANG`}
            </h1>
            <p className="text-xl text-yellow-400 font-medium">
               {getWinner()?.reason}
            </p>
          </div>

          <button 
            onClick={() => setStatus(GameStatus.IDLE)}
            className="px-8 py-3 bg-white text-black font-bold font-display text-xl hover:bg-slate-200 transition-colors"
          >
            MAIN LAGI
          </button>
        </div>
      )}
      
      {/* Credits - Fixed Position */}
      <div className="absolute bottom-4 right-4 z-50 pointer-events-none opacity-50">
        <span className="text-xs font-display text-white tracking-widest">GAME BY KREASAI.COM</span>
      </div>
    </div>
  );
};

export default App;