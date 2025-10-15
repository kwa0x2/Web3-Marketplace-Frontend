'use client';

import { ReactNode } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { createAppKit } from '@reown/appkit/react';
import { WagmiProvider } from 'wagmi';
import { config, projectId, metadata, chains, wagmiAdapter } from '@/config/web3';

const queryClient = new QueryClient();

createAppKit({
  adapters: [wagmiAdapter],
  projectId,
  networks: chains as any,
  metadata,

  features: {
    analytics: false,
    onramp: false,
    swaps: false,
    email: false, 
    socials: [],
  },

  themeMode: 'dark',
  themeVariables: {
    '--w3m-accent': '#7C3AED',
    '--w3m-color-mix': '#1a1a1a',
    '--w3m-color-mix-strength': 40,
    '--w3m-font-family': 'Inter, sans-serif',
    '--w3m-border-radius-master': '8px',
  },
});

export function Web3Provider({ children }: { children: ReactNode }) {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        {children}
      </QueryClientProvider>
    </WagmiProvider>
  );
}
