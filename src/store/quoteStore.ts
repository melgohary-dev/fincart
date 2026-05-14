import { create } from 'zustand';
import type { QuoteState } from '@/types';

/**
 * Quote builder store (Zustand).
 *
 * Holds the user's current form selections so they survive across
 * wizard steps.  The store is decoupled from react-hook-form so that
 * the sidebar summary and courier search hook can read values without
 * re-rendering the entire form.
 */
const initialState = {
  origin: '',
  destination: '',
  weight: null as number | null,
  volume: null as number | null,
};

export const useQuoteStore = create<QuoteState>((set) => ({
  ...initialState,
  setOrigin: (code) => set({ origin: code }),
  setDestination: (code) => set({ destination: code }),
  setWeight: (kg) => set({ weight: kg }),
  setVolume: (m3) => set({ volume: m3 }),
  reset: () => set(initialState),
}));
