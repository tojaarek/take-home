import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

type Card = {
  id: number;
  title: string;
  description: string;
};

type State = {
  visibleCards: Card[];
  deletedCards: Card[];
};

type Actions = {
  setVisibleCards: (cards: Card[]) => void;
  setDeletedCards: (cards: Card[]) => void;
  deleteCard: (id: number) => void;
  revertToVisible: (id: number) => void;
};

export const useStore = create<State & Actions>()(
  persist(
    (set) => ({
      visibleCards: [],
      deletedCards: [],
      setVisibleCards: (cards) => set({ visibleCards: cards }),
      setDeletedCards: (cards) => set({ deletedCards: cards }),
      deleteCard: (id) =>
        set((state) => {
          const cardToDelete = state.visibleCards.find((card) => card.id === id);
          if (!cardToDelete) {
            return state;
          }
          return {
            deletedCards: [...state.deletedCards, cardToDelete],
            visibleCards: state.visibleCards.filter((card) => card.id !== id),
          };
        }),
      revertToVisible: (id) =>
        set((state) => {
          const cardToRevert = state.deletedCards.find((card) => card.id === id);
          if (!cardToRevert) {
            return state;
          }
          return {
            deletedCards: state.deletedCards.filter((card) => card.id !== id),
            visibleCards: [...state.visibleCards, cardToRevert],
          };
        }),
    }),
    {
      name: "card-storage",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
