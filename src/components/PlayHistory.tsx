import React from 'react';
import { useGameStore } from '../store/useGameStore';
import { Clock, Activity } from 'lucide-react';

export const PlayHistory: React.FC = () => {
  const { history } = useGameStore() as any;

  return (
    <div className="bg-slate-900 p-6 rounded-3xl border border-slate-800 shadow-xl mt-4">
      <div className="flex items-center gap-3 mb-5 border-b border-slate-800 pb-3">
        <Activity size={18} className="text-yellow-500" />
        <h3 className="text-[11px] font-black uppercase text-slate-400 tracking-widest">CRONOLOGÍA DE ANOTACIONES</h3>
      </div>

      <div className="space-y-3 max-h-64 overflow-y-auto pr-2 custom-scrollbar">
        {history.map((play: any) => (
          <div key={play.id} className="flex items-center justify-between bg-slate-950 p-4 rounded-2xl border border-slate-800 shadow-inner">
            <div className="flex flex-col">
              <span className={`text-[11px] font-black uppercase leading-none mb-1.5 ${play.team === 'home' ? 'text-blue-400' : 'text-red-400'}`}>
                {play.playerName}
              </span>
              <div className="flex items-center gap-2 text-[9px] text-slate-500 font-bold uppercase tracking-wider">
                <Clock size={9} /> P{play.period} · {play.time}
              </div>
            </div>
            <div className={`text-xl font-black px-4 py-1.5 rounded-full ${play.team === 'home' ? 'bg-blue-600/10 text-blue-500' : 'bg-red-600/10 text-red-500'}`}>
              +{play.pts}
            </div>
          </div>
        ))}
        {history.length === 0 && (
          <div className="flex flex-col items-center justify-center py-12 text-slate-700 opacity-20">
            <Activity size={32} className="mb-2.5" />
            <p className="text-[10px] font-bold uppercase tracking-tighter">Sin anotaciones aún</p>
          </div>
        )}
      </div>
    </div>
  );
};