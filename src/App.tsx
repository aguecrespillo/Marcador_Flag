import React, { useState } from 'react';
import { useGameStore } from './store/useGameStore';
import { GameClock } from './components/GameClock';
import { ScoreBoard } from './components/ScoreBoard';
import { ScoringButtons } from './components/ScoringButtons';
import { Roster } from './components/Roster';
import { PlayHistory } from './components/PlayHistory';
import { Settings, X, Image as ImageIcon } from 'lucide-react';

function App() {
  const { homeTeam, awayTeam, homeLogo, awayLogo, updateTeams, isFinished } = useGameStore() as any;
  const [showSettings, setShowSettings] = useState(false);

  // Estados temporales para el formulario de configuración
  const [hName, setHName] = useState(homeTeam);
  const [aName, setAName] = useState(awayTeam);
  const [hLogo, setHLogo] = useState(homeLogo);
  const [aLogo, setALogo] = useState(awayLogo);

  const handleImage = (e: React.ChangeEvent<HTMLInputElement>, team: 'home' | 'away') => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (team === 'home') setHLogo(reader.result);
        else setALogo(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const saveSettings = () => {
    updateTeams({ 
      homeTeam: hName, 
      awayTeam: aName, 
      homeLogo: hLogo, 
      awayLogo: aLogo 
    });
    setShowSettings(false);
  };

  return (
    <div className="min-h-screen bg-slate-950 p-4 flex flex-col gap-4 max-w-md mx-auto text-white pb-10">
      
      {/* CABECERA CON RUEDA DE AJUSTES */}
      <div className="flex justify-between items-center p-2">
        <h1 className="text-blue-500 font-black italic uppercase text-xs tracking-tighter">Flag Score Alfonso</h1>
        <button 
          onClick={() => setShowSettings(true)} 
          className="p-2 bg-slate-900 rounded-full border border-slate-800 text-slate-400 hover:text-white transition-colors"
        >
          <Settings size={20} />
        </button>
      </div>

      {/* MODAL DE CONFIGURACIÓN (LOGOS Y NOMBRES) */}
      {showSettings && (
        <div className="fixed inset-0 z-[10001] bg-black/95 backdrop-blur-md flex items-center justify-center p-6">
          <div className="bg-slate-900 w-full rounded-3xl border border-slate-700 p-6 shadow-2xl overflow-y-auto max-h-[90vh]">
            <div className="flex justify-between items-center mb-6">
              <h2 className="font-black uppercase text-sm tracking-widest text-slate-400">Configurar Equipos</h2>
              <button onClick={() => setShowSettings(false)} className="p-2 bg-slate-800 rounded-full"><X size={20} /></button>
            </div>
            
            <div className="space-y-6">
              {/* Ajustes Local */}
              <div className="space-y-3">
                <label className="text-[10px] font-bold text-blue-500 uppercase tracking-widest">Equipo Local</label>
                <div className="flex gap-3 items-center">
                  <div className="relative w-14 h-14 bg-slate-950 rounded-xl border-2 border-dashed border-slate-700 flex items-center justify-center overflow-hidden">
                    {hLogo ? <img src={hLogo} className="w-full h-full object-cover" alt="Previa Local" /> : <ImageIcon className="text-slate-700" />}
                    <input type="file" accept="image/*" onChange={(e) => handleImage(e, 'home')} className="absolute inset-0 opacity-0 cursor-pointer" />
                  </div>
                  <input 
                    value={hName} 
                    onChange={(e) => setHName(e.target.value)} 
                    className="flex-1 bg-slate-950 border border-slate-800 p-3 rounded-xl outline-none focus:border-blue-500" 
                    placeholder="Nombre Local"
                  />
                </div>
              </div>

              {/* Ajustes Visitante */}
              <div className="space-y-3">
                <label className="text-[10px] font-bold text-red-500 uppercase tracking-widest">Equipo Visitante</label>
                <div className="flex gap-3 items-center">
                  <div className="relative w-14 h-14 bg-slate-950 rounded-xl border-2 border-dashed border-slate-700 flex items-center justify-center overflow-hidden">
                    {aLogo ? <img src={aLogo} className="w-full h-full object-cover" alt="Previa Visitante" /> : <ImageIcon className="text-slate-700" />}
                    <input type="file" accept="image/*" onChange={(e) => handleImage(e, 'away')} className="absolute inset-0 opacity-0 cursor-pointer" />
                  </div>
                  <input 
                    value={aName} 
                    onChange={(e) => setAName(e.target.value)} 
                    className="flex-1 bg-slate-950 border border-slate-800 p-3 rounded-xl outline-none focus:border-red-500" 
                    placeholder="Nombre Visitante"
                  />
                </div>
              </div>

              <button 
                onClick={saveSettings} 
                className="w-full bg-blue-600 hover:bg-blue-500 py-4 rounded-2xl font-black uppercase text-xs shadow-lg shadow-blue-900/40 active:scale-95 transition-all"
              >
                Guardar Cambios
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ÁREA DE JUEGO */}
      <ScoreBoard />
      
      {!isFinished && (
        <>
          <GameClock />
          <div className="grid grid-cols-2 gap-2">
             <ScoringButtons team="home" />
             <ScoringButtons team="away" />
          </div>
          <PlayHistory />
          <Roster />
        </>
      )}
    </div>
  );
}

export default App;