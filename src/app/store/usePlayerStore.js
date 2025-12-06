'use client'

import { create } from "zustand";
import { persist } from "zustand/middleware";


export const usePlayerStore = create(
  persist(
    (set) => ({
      playerId: null,
      playerTime: 0,
      points: 0,
      rewards: 0,
      winStatus: false,

      setPlayerId: (id) => set({ playerId: id }),
      setPlayerTime: (time) => set({ playerTime: time }),
      setPoints: (points) => set({ points }),
      increasePoints: (amount=1) =>   set((state) => ({ points: state.points + amount })),
      setRewards: (rewards) => set({ rewards }),
      setWinStatus: (status) => set({ winStatus: status }),

      resetPlayer: () => set({ playerId: null, playerTime: 0, points: 0, rewards: 0, winStatus: false }),
    }),

    {
      name: "player-storage",
    }
  )
);
