import React, { useState } from 'react';
import { useGameStore } from '../store/useGameStore';
import { UserPlus } from 'lucide-react';

export const Roster: React.FC = () => {
  const { homeRoster, awayRoster, addPlayer } = useGameStore() as any;
  const [playerName, setPlayerName] = useState('');
  const [playerNumber, setPlayerNumber] = useState('');

  const onAdd = (team: 'home' | 'away') => {
    if (playerName.trim() === '') return;
    addPlayer(team, { name: playerName, number: playerNumber || '00' });
    setPlayerName('');
    setPlayerNumber('');
  };

  return (
    <div className="flex flex-col gap-4 mt-6">
      <div className="bg-slate-900 p-6 rounded-3xl border border-slate-800 shadow-xl">
        <div className="flex items-center gap-2.5 mb-5 border-b border-slate-800 pb-3">
          <UserPlus size={18} className="text-yellow-500" />
          <h3 className="text-[11px] font-black uppercase text-slate-400 tracking-widest">GESTIÓN DE JUGADORES</h3>
        </div>
        <div className="flex gap-2 mb-4">
          <input type="text" placeholder="Nombre..." value={playerName} onChange={(e) => setPlayerName(e.target.value)} className="flex-1 bg-slate-950 border border-slate-800 rounded-xl p-3 text-sm text-white outline-none focus:border-blue-500" />
          <input type="text" placeholder="Nº" value={playerNumber} onChange={(e) => setPlayerNumber(e.target.value)} className="w-16 bg-slate-950 border border-slate-800 rounded-xl p-3 text-sm text-white text-center font-bold outline-none" />
        </div>
        <div className="grid grid-cols-2 gap-3">
          <button onClick={() => onAdd('home')} className="bg-blue-600 hover:bg-blue-500 text-white font-black py-3 rounded-xl transition-all active:scale-95 shadow-lg shadow-blue-900/40 text-xs tracking-widest uppercase">Añadir Local</button>
          <button onClick={() => onAdd('away')} className="bg-red-600 hover:bg-red-500 text-white font-black py-3 rounded-xl transition-all active:scale-95 shadow-lg shadow-red-900/40 text-xs tracking-widest uppercase">Añadir Visitante</button>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div className="bg-slate-900/40 p-4 rounded-2xl border border-slate-800/50 min-h-[120px]">
          <h4 className="text-[10px] font-black text-blue-500 uppercase mb-3 border-b border-blue-500/20 pb-1 tracking-widest">ROSTER LOCAL</h4>
          {homeRoster.map((p: any) => (
            <div key={p.id} className="flex justify-between bg-slate-950/60 p-2.5 rounded-lg mb-1.5 border border-slate-800 shadow-inner">
              <span className="text-slate-400 font-mono text-[11px]">#{p.number}</span>
              <span className="font-bold text-white uppercase text-[11px]">{p.name}</span>
            </div>
          ))}
        </div>
        <div className="bg-slate-900/40 p-4 rounded-2xl border border-slate-800/50 min-h-[120px]">
          <h4 className="text-[10px] font-black text-red-500 uppercase mb-3 border-b border-red-500/20 pb-1 tracking-widest">ROSTER VISITANTE</h4>
          {awayRoster.map((p: any) => (
            <div key={p.id} className="flex justify-between bg-slate-950/60 p-2.5 rounded-lg mb-1.5 border border-slate-800 shadow-inner">
              <span className="text-slate-400 font-mono text-[11px]">#{p.number}</span>
              <span className="font-bold text-white uppercase text-[11px]">{p.name}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};