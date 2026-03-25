import React, { useState } from 'react';
import { useGameStore } from '../store/useGameStore';
import { RotateCcw } from 'lucide-react';

export const ScoringButtons: React.FC<{ team: 'home' | 'away' }> = ({ team }) => {
  const { homeRoster, awayRoster, recordPlay, timeLeft } = useGameStore() as any;
  const [pendingPoints, setPendingPoints] = useState<number | null>(null);

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  const roster = team === 'home' ? homeRoster : awayRoster;

  const handleScore = (pts: number) => {
    if (roster.length === 0) {
      recordPlay(team, pts, 'EQUIPO', formatTime(timeLeft));
    } else {
      setPendingPoints(pts);
    }
  };

  const selectPlayer = (name: string) => {
    if (pendingPoints !== null) {
      recordPlay(team, pendingPoints, name, formatTime(timeLeft));
      setPendingPoints(null);
    }
  };

  const buttons = [
    { label: 'TOUCHDOWN', pts: 6 },
    { label: 'EXTRA (5Y)', pts: 1 },
    { label: 'EXTRA (10Y)', pts: 2 },
    { label: 'SAFETY', pts: 2 },
  ];

  return (
    <div className="bg-slate-900/80 p-4 rounded-3xl border border-slate-800 flex flex-col gap-3 relative overflow-hidden">
      <h3 className={`text-[10px] font-black uppercase text-center tracking-widest ${team === 'home' ? 'text-blue-500' : 'text-red-500'}`}>
        {team === 'home' ? 'LOCAL' : 'VISITANTE'}
      </h3>
      
      <div className="grid grid-cols-2 gap-2">
        {buttons.map((btn) => (
          <button
            key={btn.label}
            onClick={() => handleScore(btn.pts)}
            className={`${team === 'home' ? 'bg-blue-600' : 'bg-red-600'} p-3 rounded-2xl flex flex-col items-center active:scale-95 transition-all shadow-md`}
          >
            <span className="text-xl font-black">{btn.pts}</span>
            <span className="text-[7px] font-bold uppercase">{btn.label}</span>
          </button>
        ))}
      </div>

      {pendingPoints !== null && (
        <div className="absolute inset-0 z-50 bg-slate-900 p-4 flex flex-col border-2 border-yellow-500 rounded-3xl animate-in fade-in duration-200">
          <p className="text-[9px] font-black text-center mb-2 text-yellow-500 uppercase">¿Quién anotó?</p>
          <div className="flex-1 overflow-y-auto space-y-1 pr-1 custom-scrollbar">
            {roster.map((p: any) => (
              <button 
                key={p.id} 
                onClick={() => selectPlayer(p.name)}
                className="w-full text-left bg-slate-800 p-2 rounded-xl text-[10px] font-bold hover:bg-slate-700 uppercase"
              >
                #{p.number} {p.name}
              </button>
            ))}
          </div>
          <button onClick={() => setPendingPoints(null)} className="mt-2 text-[8px] font-black text-red-500 uppercase tracking-widest">Cancelar</button>
        </div>
      )}
    </div>
  );
};