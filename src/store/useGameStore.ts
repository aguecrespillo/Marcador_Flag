import { create } from 'zustand';

export const useGameStore = create((set) => ({
  homeTeam: 'LOCAL',
  awayTeam: 'VISITANTE',
  homeLogo: null,
  awayLogo: null,
  homeScore: 0,
  awayScore: 0,
  homeTimeouts: 2, 
  awayTimeouts: 2, 
  timeLeft: 1200,      
  timeoutTimer: null,  
  isRunning: false,
  isFinished: false,
  period: 1,
  homeRoster: [],
  awayRoster: [],
  history: [], 

  updateTeams: (data: any) => set((state: any) => ({
    homeTeam: data.homeTeam || state.homeTeam,
    awayTeam: data.awayTeam || state.awayTeam,
    homeLogo: data.homeLogo !== undefined ? data.homeLogo : state.homeLogo,
    awayLogo: data.awayLogo !== undefined ? data.awayLogo : state.awayLogo,
  })),

  toggleTimer: () => set((state: any) => ({ isRunning: !state.isRunning })),
  
  nextPeriod: () => set((state: any) => ({
    period: state.period === 1 ? 2 : 1,
    timeLeft: 1200,
    isRunning: false,
    homeTimeouts: 2,
    awayTimeouts: 2
  })),

  finishGame: () => set({ isFinished: true, isRunning: false, timeoutTimer: null }),

  resetGame: () => set({
    homeScore: 0, awayScore: 0, homeTimeouts: 2, awayTimeouts: 2,
    timeLeft: 1200, isRunning: false, isFinished: false, period: 1,
    timeoutTimer: null, homeRoster: [], awayRoster: [], history: []
  }),

  tick: () => set((state: any) => {
    if (state.timeoutTimer !== null && state.timeoutTimer > 0) return { timeoutTimer: state.timeoutTimer - 1 };
    if (state.timeoutTimer === 0) return { timeoutTimer: null };
    if (state.isRunning && state.timeLeft > 0) return { timeLeft: state.timeLeft - 1 };
    return { isRunning: false };
  }),

  requestTimeout: (team: 'home' | 'away') => set((state: any) => {
    const key = team === 'home' ? 'homeTimeouts' : 'awayTimeouts';
    if (state[key] > 0 && state.timeoutTimer === null) {
      return { [key]: state[key] - 1, timeoutTimer: 60, isRunning: false };
    }
    return {};
  }),

  addPlayer: (team: 'home' | 'away', player: { name: string; number: string }) => 
    set((state: any) => {
      const rosterKey = team === 'home' ? 'homeRoster' : 'awayRoster';
      return { [rosterKey]: [...state[rosterKey], { ...player, id: Math.random().toString(36).substr(2, 9) }] };
    }),

  recordPlay: (team: 'home' | 'away', pts: number, playerName: string, time: string) => 
    set((state: any) => ({
      [team === 'home' ? 'homeScore' : 'awayScore']: state[team === 'home' ? 'homeScore' : 'awayScore'] + pts,
      history: [{
        id: Date.now(),
        team,
        playerName,
        pts,
        time,
        period: state.period
      }, ...state.history]
    })),

  setTimeoutTimer: (val: any) => set({ timeoutTimer: val }),
}));