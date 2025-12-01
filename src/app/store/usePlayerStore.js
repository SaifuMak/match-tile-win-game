import { create } from "zustand";
import { persist } from "zustand/middleware";

export const usePlayerStore = create(
  persist(
    (set) => ({
      playerId: null,
      playerTime: 0,
      points: 0,

      setPlayerId: (id) => set({ playerId: id }),
      setPlayerTime: (time) => set({ playerTime: time }),
      setPoints: (points) => set({ points }),
      increasePoints: (amount=1) =>   set((state) => ({ points: state.points + amount })),


      resetPlayer: () => set({ playerId: null, playerTime: 0, points: 0 }),
    }),

    {
      name: "player-storage",
    }
  )
);
