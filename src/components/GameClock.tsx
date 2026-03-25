import React, { useEffect } from 'react';
import { useGameStore } from '../store/useGameStore';
import { Play, Pause, RotateCcw, SkipForward, CircleStop } from 'lucide-react';

export const GameClock: React.FC = () => {
  const { timeLeft, isRunning, toggleTimer, tick, period, nextPeriod, resetTimer, finishGame, isFinished } = useGameStore() as any;

  useEffect(() => {
    const timer = setInterval(() => tick(), 1000);
    return () => clearInterval(timer);
  }, [tick]);

  const format = (s: number) => `${Math.floor(s / 60)}:${(s % 60).toString().padStart(2, '0')}`;

  if (isFinished) return null; // Si el partido terminó, ocultamos el reloj

  return (
    <div className="bg-slate-900 p-6 rounded-3xl border border-slate-800 text-center shadow-2xl">
      <div className="flex justify-between items-center mb-2 px-2">
        <span className="text-blue-500 text-[10px] font-black tracking-[0.3em] uppercase">Parte {period}</span>
        <div className="flex gap-4">
          <button onClick={() => confirm('¿Reiniciar a 20:00?') && resetTimer()} className="text-slate-600 hover:text-slate-400">
            <RotateCcw size={16} />
          </button>
          <button onClick={() => confirm('¿Pasar a la siguiente parte?') && nextPeriod()} className="text-slate-600 hover:text-blue-500">
            <SkipForward size={16} />
          </button>
        </div>
      </div>

      <div className="text-6xl font-mono font-black text-yellow-400 mb-6 font-digital">
        {format(timeLeft)}
      </div>

      <div className="flex flex-col gap-3">
        <button 
          onClick={toggleTimer}
          className={`w-full py-4 rounded-2xl font-black text-xl flex items-center justify-center gap-2 shadow-lg ${isRunning ? 'bg-orange-600' : 'bg-green-600'}`}
        >
          {isRunning ? <Pause size={24} fill="currentColor" /> : <Play size={24} fill="currentColor" />}
          {isRunning ? 'PAUSA' : 'INICIAR PARTIDO'}
        </button>

        <button 
          onClick={() => confirm('¿FINALIZAR EL PARTIDO?') && finishGame()}
          className="w-full py-2 bg-red-900/30 hover:bg-red-600 text-red-500 hover:text-white rounded-xl font-bold text-xs flex items-center justify-center gap-2 border border-red-900/50 transition-all"
        >
          <CircleStop size={14} /> FINALIZAR PARTIDO
        </button>
      </div>
    </div>
  );
};