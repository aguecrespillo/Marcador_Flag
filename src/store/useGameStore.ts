import { create } from 'zustand';

export const useGameStore = create((set) => ({
  homeTeam: 'LOCAL',
  awayTeam: 'VISITANTE',
  homeScore: 0,
  awayScore: 0,
  gameTime: 1200,
  isRunning: false,
  
  tick: () => set((state) => (
    state.isRunning && state.gameTime > 0 
      ? { gameTime: state.gameTime - 1 } 
      : { isRunning: false }
  )),
  
  toggleClock: () => set((state) => ({ isRunning: !state.isRunning })),
  
  addPoints: (team, pts) => set((state) => ({
    [team === 'home' ? 'homeScore' : 'awayScore']: state[team === 'home' ? 'homeScore' : 'awayScore'] + pts
  })),

  resetGame: () => set({ 
    homeScore: 0, awayScore: 0, gameTime: 1200, isRunning: false 
  }),

  setTeamName: (team, name) => set({ 
    [team === 'home' ? 'homeTeam' : 'awayTeam']: name 
  }),
}));