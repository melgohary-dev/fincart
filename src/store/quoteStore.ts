import { create } from 'zustand';
import type { QuoteState } from '@/types';

const initialState = {
  origin: '',
  destination: '',
  weight: '' as number | '',
  volume: '' as number | '',
};

export const useQuoteStore = create<QuoteState>((set) => ({
  ...initialState,
  setOrigin: (code) => set({ origin: code }),
  setDestination: (code) => set({ destination: code }),
  setWeight: (kg) => set({ weight: kg }),
  setVolume: (m3) => set({ volume: m3 }),
  reset: () => set(initialState),
}));
