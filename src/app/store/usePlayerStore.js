import { create } from "zustand";
import { persist } from "zustand/middleware";

export const usePlayerStore = create(
  persist(
    (set) => ({
      playerId: null,
      time: 0,
      points: 0,

      setPlayerId: (id) => set({ playerId: id }),
      setTime: (time) => set({ time }),
      setPoints: (points) => set({ points }),
      resetPlayer: () => set({ playerId: null, time: 0, points: 0 }),
    }),

    {
      name: "player-storage", 
    }
  )
);
