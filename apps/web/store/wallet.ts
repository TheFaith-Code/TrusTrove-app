import { create } from 'zustand';

interface WalletState {
  address: string | null;
  connected: boolean;
  network: string | null;
  connect: (address: string, network: string) => void;
  disconnect: () => void;
  setAddress: (address: string | null) => void;
  setNetwork: (network: string | null) => void;
}

export const useWalletStore = create<WalletState>((set) => ({
  address: null,
  connected: false,
  network: null,
  connect: (address, network) => set({ address, connected: true, network }),
  disconnect: () => set({ address: null, connected: false, network: null }),
  setAddress: (address) => set({ address, connected: !!address }),
  setNetwork: (network) => set({ network }),
}));
